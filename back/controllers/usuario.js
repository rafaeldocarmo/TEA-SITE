import { db } from "../db.js"

export const getUser = (req, res) => {

    const id = req.params.id;

    const query = ` SELECT * from users WHERE id = ?;`;

    db.query(query, [id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar terapeutas   ', error });
        }

        return res.status(200).json(results);
    });
};