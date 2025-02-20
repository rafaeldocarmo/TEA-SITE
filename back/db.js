import mysql from "mysql2"

export const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "tea"
});

/*export const db = mysql.createConnection({
    host:       "172.16.50.171",
    port:       3306,
    user:       "tea_user",
    password:   "********",
    database:   "tea"
});*/

// Função para conectar e verificar erros
db.connect((err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      return;
    }
    console.log("Conexão bem-sucedida com o banco de dados!");
});
  
