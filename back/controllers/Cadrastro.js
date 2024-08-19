import { response } from "express";
import { db } from "../db.js";

export const addUser = ( req, res ) =>{

    const q = "INSERT INTO usuario(`nome_de_usuario`, `data_nascimento`, `cidade`, `estado`, `senha`) VALUES(?)";

    const nome_de_usuario = req.body.nome_de_usuario

    const values = [
        req.body.nome_de_usuario,
        req.body.data_nascimento,
        req.body.cidade,
        req.body.estado,
        req.body.senha
    ]

    db.query("SELECT * FROM usuario WHERE nome_de_usuario = ?", nome_de_usuario, (error, response) =>{
        if(error){
            res.send(error)
        }

        if(response.length == 0){

            db.query(q, [values], (error) => {
                if (error) return res.status(500).json(error);
        
                return res.status(200).json('Usuario adicionado com sucesso!');
            });
        } else{
            return res.send({msg: "Usuário já cadastrado"})
        }
    })

} 

export const getUsers = (_,res) => {
    const q = "SELECT * FROM usuario"

    db.query(q, (error, data) => {
        if(error) return res.json(error)

        return res.status(200).json(data)
    })
}


export const loginUser = (req, res) => {
    const nome_de_usuario = req.body.nome_de_usuario;
    const senha = req.body.senha;

    const q = "SELECT idusuario FROM usuario WHERE nome_de_usuario = ? AND senha = ?";
    
    db.query(q, [nome_de_usuario, senha], (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }

        if (result.length > 0) {
            const userID = result[0].idusuario;
            res.cookie('userID', userID, { maxAge: 900000, httpOnly: true });
            if (nome_de_usuario === 'admin' && senha === 'admin') {
                return res.status(200).send({ msg: "Admin logado com sucesso", userType: 'admin', userID });
            }else{
                return res.status(200).send({ msg: "Usuário logado com sucesso", userType: 'user', userID });
            }
        } else {
            return res.status(401).send({ msg: "Credenciais inválidas" });
        }
    });
}

export const getUserByID = (req,res) => {
    const q = "SELECT * FROM usuario WHERE `idusuario` = ?"

    db.query(q, [req.params.id], (error, data) => {
        if(error) return res.json(error)

        return res.status(200).json(data)
    })
}


export const updateUser = (req, res) => {
    const { id } = req.params;
    const { nome_de_usuario, data_nascimento, cidade, estado, senha } = req.body;

    const q = `
        UPDATE usuario
        SET nome_de_usuario = ?,
            data_nascimento = ?,
            cidade = ?,
            estado = ?,
            senha = ?
        WHERE idusuario = ?;
    `;

    const values = [nome_de_usuario, data_nascimento, cidade, estado, senha, id];

    db.query(q, values, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar usuário', error });
        }

        return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    });
};

