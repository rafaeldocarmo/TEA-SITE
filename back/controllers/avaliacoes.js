import { db } from "../db.js"

export const addAvaliacao = (req, res) => {

    const q = "INSERT INTO avaliacoes(`idconteudo`, `idusuario`, `nota`, `comentarios`) VALUES(?)";

    const values = [
        req.body.idconteudo,
        req.body.idusuario,
        req.body.nota,
        req.body.comentarios,
    ]

    db.query(q, [values], (error) => {
        if (error) {
            console.error(error);
            return res.status(500).json(error);
        }

        return res.status(200).json('Avaliacao adicionado com sucesso!');
    });
};

export const editAvaliacao = (req, res) => {

    const q = "UPDATE avaliacoes SET `nota` = ?, `comentarios` = ?  WHERE `idavaliacao` = ?;";

    const values = [
        req.body.nota,
        req.body.comentarios,
    ]

    db.query(q, [...values, req.params.id], (error) => {
        if (error) return res.status(500).json(error);

        return res.status(200).json('Avaliacao Atualizada com sucesso!');
    });
};

export const deleteAvaliacao = (req, res) => {

    const q = "DELETE FROM avaliacoes WHERE `idavaliacao` = ?;";

    const values = [
        req.body.nota,
        req.body.comentarios,
    ]

    db.query(q, [req.params.id], (error) => {
        if (error) return res.status(500).json(error);

        return res.status(200).json('Avaliacao Deletada com sucesso!');
    });
};

export const getAvaliacoes = (_,res) => {
    const q = `
        SELECT avaliacoes.*, usuario.nome_de_usuario AS nome_usuario, conteudo.titulo AS nome_conteudo
        FROM avaliacoes
        INNER JOIN usuario ON avaliacoes.idusuario = usuario.idusuario
        INNER JOIN conteudo ON avaliacoes.idconteudo = conteudo.idconteudo
        `

    db.query(q, (error, data) => {
        if(error) return res.json(error)

        return res.status(200).json(data)
    })
}

export const getAvaliacoesByID = (req,res) => {
    const q = `
    SELECT a.*, c.titulo AS titulo, c.diretor AS autor, c.tipo AS tipo, u.nome_de_usuario AS user, u.idusuario AS idusuario
    FROM avaliacoes a
    INNER JOIN conteudo c ON a.idconteudo = c.idconteudo
    INNER JOIN usuario u ON a.idusuario = u.idusuario
    WHERE a.idavaliacao = ?;`

    db.query(q, [req.params.id], (error, data) => {
        if(error) return res.json(error)

        return res.status(200).json(data)
    })
}

export const getAvaliacoesByConteudo = (req,res) => {
    const q = "SELECT * FROM avaliacoes WHERE `idconteudo` = ?;"

    db.query(q, [req.params.id], (error, data) => {
        if(error) return res.json(error)

        return res.status(200).json(data)
    })
}

export const getAvaliacoesByUser = (req,res) => {
    const q = "SELECT * FROM avaliacoes WHERE `idusuario` = ?;"

    db.query(q, [req.params.id], (error, data) => {
        if(error) return res.json(error)

        return res.status(200).json(data)
    })
}


export const inserirCurtida = (req, res) => {
    const q = "INSERT INTO curtidas_avaliacoes (idavaliacao, idusuario) VALUES (?, ?)";

    const { idavaliacao, idusuario } = req.body;

    db.query(q, [idavaliacao, idusuario], (error, data) => {
        if (error) {
            console.error(error);
            return res.status(500).json(error);
        }

        return res.status(200).json(data);
    });
};

export const checkCurtida = (req, res) => {
    const q = `
        SELECT * FROM curtidas_avaliacoes
        WHERE idavaliacao = ? AND idusuario = ?
    `;

    const idUsuario = req.params.idUsuario;
    const idAvaliacao = req.params.idAvaliacao;

    db.query(q, [idAvaliacao, idUsuario], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json(error);
        }

        return res.status(200).json(results);
    });
};

export const deleteCurtida = (req, res) => {
    const idUsuario = req.params.idUsuario;
    const idAvaliacao = req.params.idAvaliacao;

    const q = `
        DELETE FROM curtidas_avaliacoes
        WHERE idavaliacao = ? AND idusuario = ?
    `;

    db.query(q, [idAvaliacao, idUsuario], (error, data) => {
        if (error) {
            console.error(error);
            return res.status(500).json(error);
        }

        return res.status(200).json(data);
    });
};

export const fetchCurtidas = (req, res) => {
    const idAvaliacao = req.params.idavaliacao;
    const q = 'SELECT COUNT(*) AS curtidas FROM curtidas_avaliacoes WHERE idavaliacao = ?';

    db.query(q, [idAvaliacao], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json(error);
        }

        const curtidas = results[0].curtidas;
        return res.status(200).json({ curtidas });
    });
};

export const getComentariosByID = (req, res) => {
    const q = `
        SELECT c.*, u.nome_de_usuario AS nome_usuario, u.img AS img, u.estado AS estado
        FROM comentarios_avaliacoes c
        INNER JOIN usuario u ON c.idusuario = u.idusuario
        WHERE c.idavaliacao = ?
    `;
    db.query(q, [req.params.id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json(error);
        }
        return res.status(200).json(results);
    });
};
export const postComentario = (req, res) => {
    const { idusuario, comentario } = req.body;
    const idavaliacao = req.params.id;
    const q = `
        INSERT INTO comentarios_avaliacoes (idavaliacao, idusuario, comentario)
        VALUES (?, ?, ?)
    `;
    db.query(q, [idavaliacao, idusuario, comentario], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json(error);
        }
        return res.status(201).json({ message: 'Comentário adicionado com sucesso!' });
    });
};

export const getTotalCurtidasPorUsuario = (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT COUNT(*) AS totalCurtidas
        FROM curtidas_avaliacoes ca
        INNER JOIN avaliacoes a ON ca.idavaliacao = a.idavaliacao
        WHERE a.idusuario = ?;
    `;

    db.query(query, [id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar total de curtidas', error });
        }

        const totalCurtidas = results[0].totalCurtidas;
        return res.status(200).json({ totalCurtidas });
    });
};

