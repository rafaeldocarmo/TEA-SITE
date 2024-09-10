import  express  from "express";
import { addSchedule, editSchedule, getSchedules } from "../controllers/cronograma.js";
import { acceptFriendRequest, getPendingFriendRequests, getTherapist } from "../controllers/amizades.js";
import { authController } from "../controllers/autenticacaoController.js";
import { getUser } from "../controllers/usuario.js";

const router = express.Router()

router
    .route('/api/cronograma')
    .post(authController.verifyToken, addSchedule)
    .put(authController.verifyToken, editSchedule)

router
    .route('/api/cronograma/:id')
    .get(authController.verifyToken, getSchedules)

router
    .route('/api/terapeutas')
    .get(getTherapist)
    .post(authController.verifyToken, acceptFriendRequest)

router
    .route('/api/terapeutas/:id')
    .get(authController.verifyToken, getPendingFriendRequests)

router
    .route('/api/usuario/:id')
    .get(authController.verifyToken, getUser)

router
    .route('/api/register')
    .post(authController.register)

router
    .route('/api/login')
    .post(authController.login)
    
export default router