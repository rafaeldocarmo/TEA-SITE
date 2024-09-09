import 'dotenv/config'; 
import  express  from "express";
import userRoutes from "./routes/AllRoutes.js"
import cors from "cors";
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())

const port = 8800

app.use(cookieParser());
app.use(cors())

app.use(userRoutes)
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Listening port ${port}`)
})
