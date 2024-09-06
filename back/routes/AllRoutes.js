import  express  from "express";
import { addSchedule, editSchedule, getSchedules } from "../controllers/cronograma.js";


const router = express.Router()

router
    .route('/api/cronograma')
    .post(addSchedule)
    .put(editSchedule)

router
    .route('/api/cronograma/:id')
    .get(getSchedules)


export default router