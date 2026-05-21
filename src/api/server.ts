import express from 'express';
import router from './routes/routes';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());
app.use('/', router);


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});