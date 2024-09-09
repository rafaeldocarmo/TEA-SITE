import  express  from "express";
import { addSchedule, editSchedule, getSchedules } from "../controllers/cronograma.js";
import { acceptFriendRequest, getPendingFriendRequests, getTherapist } from "../controllers/amizades.js";
import { authController } from "../controllers/autenticacaoController.js";

const router = express.Router()

router
    .route('/api/cronograma')
    .post(addSchedule)
    .put(editSchedule)

router
    .route('/api/cronograma/:id')
    .get(getSchedules)

router
    .route('/api/terapeutas')
    .get(getTherapist)
    .post(acceptFriendRequest)

router
    .route('/api/terapeutas/:id')
    .get(getPendingFriendRequests)

router.post('/api/register', authController.register);
router.post('/api/login', authController.login);
router.get('/api/protected', authController.verifyToken, authController.protected);

export default router