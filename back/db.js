import mysql from "mysql2"

export const db = mysql.createConnection({
    host: "bancoCentralflix",
    port: 3306,
    user: "admin",
    password: "password",
    database: "centralflix"
})
