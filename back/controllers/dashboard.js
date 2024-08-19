import { db } from "../db.js"

export const mediaAmigos = (req, res) => {
    const qTotalAmizades = `
        SELECT COUNT(*) AS totalAmizades
        FROM amizade
    `;

    const qTotalUsuarios = `
        SELECT COUNT(*) AS totalUsuarios
        FROM usuario
    `;

    db.query(qTotalAmizades, (errorAmizades, resultsAmizades) => {
        if (errorAmizades) {
            console.error(errorAmizades);
            return res.status(500).json(errorAmizades);
        }

        const totalAmizades = resultsAmizades[0].totalAmizades;

        db.query(qTotalUsuarios, (errorUsuarios, resultsUsuarios) => {
            if (errorUsuarios) {
                console.error(errorUsuarios);
                return res.status(500).json(errorUsuarios);
            }

            const totalUsuarios = resultsUsuarios[0].totalUsuarios;

            const media = totalAmizades / totalUsuarios;
            const mediaFormatted = media.toFixed(2); // Formata para 2 casas decimais

            return res.status(200).json({ totalAmizades, totalUsuarios, media: mediaFormatted });
        });
    });
};

export const topUsuariosAmigos = (req, res) => {
    const qTopUsuarios = `
        SELECT
            u.idusuario,
            u.nome_de_usuario,
            u.estado,
            u.cidade,
            COUNT(a.idamizade) AS totalAmigos
        FROM
            usuario u
        LEFT JOIN
            amizade a ON u.idusuario = a.idusuarioremetente
        WHERE
            a.status = 'amigos'
        GROUP BY
            u.idusuario, u.nome_de_usuario
        ORDER BY
            totalAmigos DESC
        LIMIT 5;
    `;

    db.query(qTopUsuarios, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json(error);
        }

        return res.status(200).json(results);
    });
};
export const amigosPorEstado = (req, res) => {
        const q = `
        SELECT 
            u.estado,
            COUNT(a.idamizade) AS totalAmigos
        FROM 
            usuario u
        INNER JOIN 
            amizade a ON u.idusuario = a.idusuarioremetente
        WHERE 
            a.status = 'amigos'
        GROUP BY 
            u.estado
        ORDER BY 
            totalAmigos DESC
        LIMIT 5
    `;

    db.query(q, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.status(200).json(results);
    });
};


