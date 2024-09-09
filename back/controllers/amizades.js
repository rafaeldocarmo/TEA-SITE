import { db } from "../db.js"

export const getTherapist = (req, res) => {

    const query = ` SELECT * from users WHERE user_type_id = 1; `;

    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar terapeutas   ', error });
        }

        return res.status(200).json(results);
    });
};

export const askNewAmizade = (req, res) => {

    const q = "INSERT INTO therapist_patient(`therapist_id`, `patient_id`, `status`) VALUES(?, ?, 'pendente')";

    const {therapist_id, patient_id} = req.body;

    db.query(q, [therapist_id, patient_id], (error) => {
        if (error) return res.status(500).json(error);

        return res.status(200).json('Avaliacao adicionado com sucesso!');
    });
};

export const declineAmizade = (req, res) => {

    const q = "DELETE FROM therapist_patient WHERE id = ?";

    db.query(q, [req.params.id], (error) => {
        if (error) return res.status(500).json(error);

        return res.status(200).json('Avaliacao adicionado com sucesso!');
    });
};

export const acceptFriendRequest = (req, res) => {
    const q = "UPDATE therapist_patient SET status = 'check' WHERE therapist_id = ? AND patient_id = ?";

    const {therapist_id, patient_id} = req.body;

    db.query(q, [therapist_id, patient_id], (error) => {
        if (error) {
            return res.status(500).json(error);
        }

        return res.status(200).json('Solicitação de amizade aceita com sucesso!');
    });
};

export const getPendingFriendRequests = (req, res) => {
    const therapist_id = req.params.id;

    const q = `
        SELECT 
            a.id AS request_id, -- Renomeia a.id para request_id
            u.name AS nome,
            u.email AS email,
            u.child_name AS child_name,
            u.id AS user_id -- Renomeia u.id para user_id
        FROM 
            therapist_patient AS a
        INNER JOIN 
            users AS u ON a.patient_id = u.id
        WHERE 
            a.therapist_id = ? 
            AND a.status = 'pendente'
    `;


    db.query(q, [therapist_id], (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }

        return res.status(200).json(results);
    });
};
