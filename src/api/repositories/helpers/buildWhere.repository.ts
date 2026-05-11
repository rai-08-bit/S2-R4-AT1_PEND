type Where = Record<string, any>;

type JoinOperator = 'AND' | 'OR';

const buildWhere = (where?: Where, joinOperator: JoinOperator = 'AND') => {
    if (!where || Object.keys(where).length === 0) {
        return {
            clause: '',
            values: []
        };
    }

    const keys = Object.keys(where);

    const conditions = keys.map((key) => {
        return `${key} = ?`;
    });

    const values = keys.map((key) => where[key]);

    return {
        clause: ` AND (${conditions.join(` ${joinOperator} `)})`,
        values
    };
};

export default buildWhere;