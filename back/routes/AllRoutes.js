import  express  from "express";
import { addSchedule, getSchedules } from "../controllers/cronograma.js";


const router = express.Router()

router
    .route('/api/cronograma')
    .post(addSchedule)

router
    .route('/api/cronograma/:id')
    .get(getSchedules)


export default router