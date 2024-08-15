import { db } from "../db.js";

export const getRecomendacoes = (req, res) => {
    const userId = req.params.id;

    const q = `
    SELECT c.idconteudo, c.titulo, c.diretor, c.editora, c.pais, c.ano, g.nome AS genero, c.atores AS elenco, c.img AS img
    FROM conteudo c
    JOIN genero g ON c.idgenero = g.idgenero
    WHERE (
        c.idgenero IN (
            SELECT DISTINCT c.idgenero
            FROM avaliacoes a
            JOIN conteudo c ON a.idconteudo = c.idconteudo
            WHERE a.idusuario = ? AND a.nota > 6
        )
        OR c.diretor IN (
            SELECT DISTINCT c.diretor
            FROM avaliacoes a
            JOIN conteudo c ON a.idconteudo = c.idconteudo
            WHERE a.idusuario = ? AND a.nota > 6
        )
        OR c.atores IN (
            SELECT DISTINCT c.atores
            FROM avaliacoes a
            JOIN conteudo c ON a.idconteudo = c.idconteudo
            WHERE a.idusuario = ? AND a.nota > 6
        )
        OR c.editora IN (
            SELECT DISTINCT c.editora
            FROM avaliacoes a
            JOIN conteudo c ON a.idconteudo = c.idconteudo
            WHERE a.idusuario = ? AND a.nota > 6
        )
        OR c.idconteudo IN (
            SELECT a.idconteudo
            FROM avaliacoes a
            JOIN amizade am ON (
                (am.idusuarioremetente = a.idusuario AND am.status = 'amigos')
                OR (am.idusuariorecebedor = a.idusuario AND am.status = 'amigos')
            )
            WHERE (am.idusuarioremetente = ? OR am.idusuariorecebedor = ?)
            AND a.nota > 9
        )
    )
    AND c.idconteudo NOT IN (
        SELECT idconteudo
        FROM avaliacoes
        WHERE idusuario = ?
    );
    
        
        `;

    db.query(q, [userId, userId, userId, userId, userId, userId, userId, userId, userId], (error, data) => {
        if (error) return res.json(error);

        return res.status(200).json(data);
    });
};

