import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { db } from '../db.js'
const secretKey = process.env.SECRET_KEY; 

export const authController = {
    register: (req, res) => {
        const { user_type_id, especialidade, name, email, phone, child_name, child_gender, child_birthdate, senha, cpf } = req.body

        const qCheckUser = "SELECT * FROM users WHERE email = ?"
        db.query(qCheckUser, [email], (error, response) => {
            if (error) {
                return res.status(500).send({ message: "Erro ao verificar o usuário", error })
            }

            if (response.length > 0) {
                return res.status(409).send({ message: "Usuário já cadastrado" })
            }

            const hashedPassword = bcrypt.hashSync(senha, 8)
            const qInsertUser = `
                INSERT INTO users (user_type_id, especialidade, name, email, phone, child_name, child_gender, child_birthdate, senha, cpf)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `
            const values = [user_type_id, especialidade, name, email, phone, child_name, child_gender, child_birthdate, hashedPassword, cpf]

            db.query(qInsertUser, values, (error) => {
                if (error) {
                    return res.status(500).json({ message: "Erro ao cadastrar usuário", error })
                }
                return res.status(201).send({ message: "Usuário cadastrado com sucesso!" })
            })
        })
    },

    login: (req, res) => {
        const { email, senha } = req.body

        const q = "SELECT * FROM users WHERE email = ?"
        db.query(q, [email], (error, response) => {
            if (error) return res.status(500).send({ message: "Erro no banco de dados", error })
            if (response.length === 0) return res.status(404).send({ message: "Usuário não encontrado!" })

            const user = response[0]

            const isPasswordValid = bcrypt.compareSync(senha, user.senha)
            if (!isPasswordValid) return res.status(401).send({ message: "Senha inválida!" })

            const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 })

            return res.status(200).send({ token, message: "Login realizado com sucesso!" })
        })
    },

   verifyToken:  (req, res, next) => {
        const token = req.headers['authorization'];
    
        if (!token) return res.status(403).send({ message: "Nenhum token fornecido!" });
            
        const tokenWithoutBearer = token.split(' ')[1];
    
        jwt.verify(tokenWithoutBearer, secretKey, (err, decoded) => {
            if (err) {
                return res.status(500).send({ message: "Falha na autenticação do token." });
            }
    
            req.userId = decoded.id;
            next();
        });
    }
}