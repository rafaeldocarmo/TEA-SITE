import { db } from "../db.js"

export const getPatients = (req, res) => {
    
    const query = `SELECT * FROM users WHERE user_type_id IN (2,3)`; 

    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar pacientes', error });
        }

        return res.status(200).json(results);
    });
};

export const askNewAmizade = (req, res) => {
    const { therapist_id, patient_id } = req.body;
  
    const checkQuery = "SELECT * FROM therapist_patient WHERE therapist_id = ? AND patient_id = ?";
  
    db.query(checkQuery, [therapist_id, patient_id], (error, results) => {
      if (error) return res.status(500).json(error);
  
      if (results.length > 0) {
        return res.status(400).json('Essa amizade já existe.');
      } else {
        const insertQuery = "INSERT INTO therapist_patient(`therapist_id`, `patient_id`, `status`) VALUES(?, ?, 'pendente')";
  
        db.query(insertQuery, [therapist_id, patient_id], (error) => {
          if (error) return res.status(500).json(error);
  
          return res.status(200).json('Amizade adicionada com sucesso!');
        });
      }
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

    db.query(q, [therapist_id, patient_id], (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Solicitação de amizade não encontrada.' });
        }

        return res.status(200).json('Solicitação de amizade aceita com sucesso!');
    });
};

export const getPendingFriendRequests = (req, res) => {
    const therapist_id = req.params.id;
    const { user_type_id } = req.query; 

    let q;
    let params;
    if(user_type_id === '1'){
        q = `
            SELECT 
                a.id AS request_id,
                a.status AS status,
                u.name AS nome,
                u.cpf AS cpf,
                u.email AS email,
                u.child_name AS child_name,
                u.id AS user_id -- Renomeia u.id para user_id
            FROM 
                therapist_patient AS a
            INNER JOIN 
                users AS u ON a.patient_id = u.id
            WHERE 
                a.therapist_id = ?
        `;
        params = [therapist_id];
    } else{
        q = `
        SELECT 
            a.id AS request_id,
            a.status AS status,
            u.name AS nome,
            u.email AS email,
            u.child_name AS child_name,
            u.id AS user_id -- Renomeia u.id para user_id
        FROM 
            therapist_patient AS a
        INNER JOIN 
            users AS u ON a.therapist_id = u.id
        WHERE 
            a.patient_id = ?
        `;
        params = [therapist_id];
    }


    db.query(q, params, (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }

        return res.status(200).json(results);
    });
};

export const countAmizades = (req, res) => {
    const id  = req.params.id;

    const q = `
        SELECT u.name, u.email, u.id
        FROM therapist_patient tp
        JOIN users u ON (tp.therapist_id = u.id OR tp.patient_id = u.id)
        WHERE (tp.therapist_id = ? AND tp.patient_id != ?)
           OR (tp.patient_id = ? AND tp.therapist_id != ?)
    `;

    const params = [id, id, id, id];

    db.query(q, params, (error, results) => {
        if (error) return res.status(500).json(error);

        const filteredResults = results.filter(result => result.name !== undefined);
        
        if (filteredResults.length > 0) {
            return res.status(200).json(filteredResults[0]);
        } else {
            return res.status(404).json({ message: 'No related user found' });
        }
    });
};

export const getFriendships = (req, res) => {
    const userId = req.params.id;

    const query = `
        SELECT 
            tp.id AS friendship_id,
            u.id AS user_id,
            u.name,
            u.email,
            u.child_name,
            tp.status
        FROM 
            therapist_patient tp
        INNER JOIN 
            users u ON (tp.therapist_id = u.id OR tp.patient_id = u.id)
        WHERE 
            (tp.therapist_id = ? OR tp.patient_id = ?)
            AND tp.status = 'check'
            AND u.id != ?; -- Exclui o próprio usuário das amizades
    `;

    db.query(query, [userId, userId, userId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar amizades', error });
        }

        return res.status(200).json(results);
    });
};
