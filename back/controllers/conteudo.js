import { db } from "../db.js"
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage }).single('img');


export const addConteudo = (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Nenhuma imagem foi enviada.' });
        }

        const q = "INSERT INTO conteudo(`titulo`, `diretor`, `atores`, `pais`, `ano`, `idgenero`, `img`, `temporadas`, `editora`, `tipo`) VALUES(?)";

        const values = [
            req.body.titulo,
            req.body.diretor,
            req.body.atores,
            req.body.pais,
            req.body.ano,
            req.body.idgenero,
            req.file.filename,
            req.body.temporadas,
            req.body.editora,
            req.body.tipo
        ]

        db.query(q, [values], (error) => {
            if (error) return res.status(500).json(error);

            return res.status(200).json('Conteudo adicionado com sucesso!');
        });
    });
};

