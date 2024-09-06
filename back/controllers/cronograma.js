import { db } from "../db.js"

export const addSchedule = async (req, res) => {
    const { user_id, week_1, week_2, week_3, week_4, week_5, week_6, week_7, week_8 } = req.body;

    const q = 'INSERT INTO schedules (user_id, week_1, week_2, week_3, week_4, week_5, week_6, week_7, week_8) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'

    db.query(q, [user_id, week_1, week_2, week_3, week_4, week_5, week_6, week_7, week_8], (error) => {
        if (error) {
            console.error(error);
            return res.status(500).json(error);
        }

        return res.status(200).json('Agenda adicionada com sucesso!');
    })

}

export const editSchedule = async (req, res) => {
    const {  week_1, week_2, week_3, week_4, week_5, week_6, week_7, week_8, user_id, id } = req.body;

    const q = "UPDATE schedules SET `user_id` = ? , `week_1` = ?, `week_2` = ?, `week_3` = ?, `week_4` = ?, `week_5` = ?, `week_6` = ?, `week_7` = ?, `week_8` = ? WHERE `id` = ?;"

    db.query(q, [user_id, week_1, week_2, week_3, week_4, week_5, week_6, week_7, week_8, id], (error) => {
        if (error) {
            console.error(error);
            return res.status(500).json(error);
        }

        return res.status(200).json('Agenda editada com sucesso!');
    })

}

export const getSchedules = (req, res) => {
    const userId = req.params.id;

    const q = 'SELECT * FROM schedules WHERE user_id = ?';

    db.query(q, [userId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json(error);
        }

        if (results.length === 0) {
            return res.status(404).json('Nenhum cronograma encontrado para o usuário.');
        }

        return res.status(200).json(results);
    });
};