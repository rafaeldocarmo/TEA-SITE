import { db } from "../db.js"

export const getAmizadesByUser = (req,res) => {
    const q = "SELECT COUNT(*) AS quantidade FROM amizade WHERE idusuarioremetente = ? OR idusuariorecebedor = ?"

    db.query(q, [req.params.id, req.params.id], (error, data) => {
        if(error) return res.json(error)

        const quantidadeAmizades = data[0].quantidade;
        res.status(200).json({ quantidadeAmizades });
    })
}

export const buscarAmigos = (req, res) => {
    const idUsuario = req.params.id;

    const query = `
        SELECT u.idusuario, u.nome_de_usuario, u.cidade, u.estado, u.img
        FROM amizade a
        INNER JOIN usuario u 
            ON (a.idusuarioremetente = u.idusuario OR a.idusuariorecebedor = u.idusuario)
        WHERE (a.idusuarioremetente = ? OR a.idusuariorecebedor = ?) 
            AND a.status = 'amigos'
            AND u.idusuario != ?
        `;

    db.query(query, [idUsuario, idUsuario, idUsuario], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar amigos', error });
        }

        return res.status(200).json(results);
    });
};

export const askNewAmizade = (req, res) => {

    const q = "INSERT INTO amizade(`idusuarioremetente`, `idusuariorecebedor`, `status`) VALUES(?, ?, 'pendente')";

    const idUsuarioDestinatario = req.body.idUsuarioDestinatario;

    db.query(q, [req.params.id, idUsuarioDestinatario], (error) => {
        if (error) return res.status(500).json(error);

        return res.status(200).json('Avaliacao adicionado com sucesso!');
    });
};

export const declineAmizade = (req, res) => {

    const q = "DELETE FROM amizade WHERE idamizade = ?";

    db.query(q, [req.params.id], (error) => {
        if (error) return res.status(500).json(error);

        return res.status(200).json('Avaliacao adicionado com sucesso!');
    });
};

export const acceptFriendRequest = (req, res) => {
    const q = "UPDATE amizade SET status = 'amigos' WHERE idusuarioremetente = ? AND idusuariorecebedor = ?";

    const idUsuarioRemetente = req.body.idUsuarioRemetente;
    const idUsuarioDestinatario = req.params.id;

    db.query(q, [idUsuarioRemetente, idUsuarioDestinatario], (error) => {
        if (error) {
            return res.status(500).json(error);
        }

        return res.status(200).json('Solicitação de amizade aceita com sucesso!');
    });
};

export const getPendingFriendRequests = (req, res) => {
    const idUsuarioDestinatario = req.params.id;

    const q = `
        SELECT 
            a.idamizade,
            u.nome_de_usuario AS nome,
            u.data_nascimento AS data_nascimento,
            u.img AS img,
            u.idusuario as idusuario
        FROM 
            amizade AS a
        INNER JOIN 
            usuario AS u ON a.idusuarioremetente = u.idusuario
        WHERE 
            a.idusuariorecebedor = ? 
            AND a.status = 'pendente'
    `;

    db.query(q, [idUsuarioDestinatario], (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }

        return res.status(200).json(results);
    });
};

export const amigosEmComum = (req, res) => {
    const { idUsuario1, idUsuario2 } = req.params;

    const query = `
    SELECT u.idusuario, u.nome_de_usuario, u.data_nascimento, u.cidade, u.estado
    FROM usuario u
    JOIN amizade a1 ON u.idusuario = a1.idusuarioremetente
    WHERE a1.idusuariorecebedor = ? AND EXISTS (
        SELECT 1
        FROM amizade a2
        WHERE a2.idusuarioremetente = u.idusuario
        AND a2.idusuariorecebedor = ?
    )
    UNION
    SELECT u.idusuario, u.nome_de_usuario, u.data_nascimento, u.cidade, u.estado
    FROM usuario u
    JOIN amizade a1 ON u.idusuario = a1.idusuarioremetente
    WHERE a1.idusuariorecebedor = ? AND EXISTS (
        SELECT 1
        FROM amizade a2
        WHERE a2.idusuarioremetente = u.idusuario
        AND a2.idusuariorecebedor = ?
    );
        `;

    db.query(query, [idUsuario1, idUsuario2, idUsuario1, idUsuario2], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar amigos em comum', error });
        }

        return res.status(200).json(results);
    });
};

export const saoAmigos = (req, res) => {
    const { idUsuario1, idUsuario2 } = req.params;

    const query = `
        SELECT COUNT(*) AS amigos
        FROM amizade
        WHERE 
            ((idusuarioremetente = ? AND idusuariorecebedor = ?) OR (idusuarioremetente = ? AND idusuariorecebedor = ?))
            AND status = 'amigos';
    `;

    db.query(query, [idUsuario1, idUsuario2, idUsuario2, idUsuario1], (error, results) => {
        if (error) {
            console.error('Erro ao verificar se são amigos:', error);
            return res.status(500).json({ message: 'Erro ao verificar se são amigos', error });
        }

        const amigos = results[0].amigos > 0;
        return res.status(200).json({ amigos });
    });
};