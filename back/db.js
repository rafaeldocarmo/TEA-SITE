import mysql from "mysql2"

export const db = mysql.createConnection({
    host: process.env.DB_HOST || "bancotea",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "password",
    database: process.env.DB_NAME || "bancotea"
});

db.connect((err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      return;
    }
    console.log("Conexão bem-sucedida com o banco de dados!", db.config.host);
});
  
