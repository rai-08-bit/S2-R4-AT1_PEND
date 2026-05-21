import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Garante que o dotenv seja carregado antes de qualquer verificação
dotenv.config();

// Verificação de variáveis de ambiente
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
    console.error("Variáveis de ambiente encontradas:", {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        db: process.env.DB_DATABASE
    });
    throw new Error("Faltando variáveis críticas no arquivo .env para o banco de dados.");
}

class Database {
    private static instance: Database | null = null;
    private pool!: mysql.Pool;

    private constructor() {
        // O construtor privado impede instanciamento externo (regra do Singleton)
    }

    private createPool() {
        try {
            this.pool = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                port: Number(process.env.DB_PORT) || 3306, // Fallback para porta padrão
                waitForConnections: true,
                connectionLimit: 50,
                queueLimit: 0,
                timezone: 'Z'
            });
            console.log("✅ Pool de conexão MySQL criado com sucesso.");
        } catch (error) {
            console.error("❌ Erro ao criar o pool de conexão:", error);
            throw error;
        }
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
            Database.instance.createPool();
        }
        return Database.instance;
    }

    public getPool(): mysql.Pool {
        return this.pool;
    }
}

// Exportamos a conexão pronta para uso
export const connection = Database.getInstance().getPool();