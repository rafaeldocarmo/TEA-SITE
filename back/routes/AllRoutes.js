import  express  from "express";
import { addUser, getUserByID, getUsers, loginUser, updateUser } from "../controllers/Cadrastro.js";
import { getFilmes, addConteudo, getConteudobyId, updateConteudo, deleteConteudo, getConteudo, getSeries, getLivros } from "../controllers/conteudo.js"
import { addAvaliacao, checkCurtida, deleteAvaliacao, deleteCurtida, editAvaliacao, fetchCurtidas, getAvaliacoes, getAvaliacoesByConteudo, getAvaliacoesByID, getAvaliacoesByUser, getComentariosByID, getTotalCurtidasPorUsuario, inserirCurtida, postComentario } from "../controllers/avaliacoes.js";
import { acceptFriendRequest, amigosEmComum, askNewAmizade, buscarAmigos, declineAmizade, getAmizadesByUser, getPendingFriendRequests, saoAmigos } from "../controllers/amizades.js";
import { getRecomendacoes } from "../controllers/recomendacoes.js";
import { amigosPorEstado, mediaAmigos, topUsuariosAmigos } from "../controllers/dashboard.js";


const router = express.Router()

router
    .route('/cadastro')
    .get(getUsers)
    .post(addUser)

router
    .route('/cadastro/:id')
    .put(updateUser)

router
    .route('/login')
    .post(loginUser)

router
    .route('/user/:id/amizades')
    .get(getAmizadesByUser)
    .post(askNewAmizade)
    .put(acceptFriendRequest)
    .delete(declineAmizade)

router
    .route('/user/:id/todasamizades')
    .get(buscarAmigos)

router
    .route('/user/:id/totalCurtidas')
    .get(getTotalCurtidasPorUsuario)

router
    .route('/user/:id/amizadesPendentes')
    .get(getPendingFriendRequests)

router
    .route('/amizadesEmComum/:idUsuario1/:idUsuario2')
    .get(amigosEmComum)

router
    .route('/verificaAmizade/:idUsuario1/:idUsuario2')
    .get(saoAmigos)

router
    .route("/filmes")
    .get(getFilmes)

router
    .route('/series')
    .get(getSeries)

router
    .route('/livros')
    .get(getLivros)

router
    .route("/conteudo")
    .get(getConteudo)
    .post(addConteudo)

router
    .route('/conteudo/:id')
    .get(getConteudobyId)
    .put(updateConteudo)
    .delete(deleteConteudo)

router
    .route('/avaliacao')
    .get(getAvaliacoes)
    .post(addAvaliacao)

router
    .route('/avaliacao/:id')
    .get(getAvaliacoesByID)
    .put(editAvaliacao)
    .delete(deleteAvaliacao)

router
    .route('/avaliacao/conteudo/:id')
    .get(getAvaliacoesByConteudo)

router
    .route('/avaliacao/user/:id')
    .get(getAvaliacoesByUser)

router
    .route('/user/:id')
    .get(getUserByID)

router
    .route('/curtida')
    .post(inserirCurtida)

router
    .route('/curtida/:idUsuario/:idAvaliacao')
    .get(checkCurtida)
    .delete(deleteCurtida)

router
    .route('/curtida/:idavaliacao')
    .get(fetchCurtidas)

router
    .route('/avaliacao/:id/comentarios')
    .get(getComentariosByID)
    .post(postComentario)

router
    .route('/recomendacoes/:id')
    .get(getRecomendacoes)

router
    .route('/dashboard/media')
    .get(mediaAmigos)

router
    .route('/dashboard/topamigos')
    .get(topUsuariosAmigos)

router
    .route('/dashboard/amigosPorEstado')
    .get(amigosPorEstado)

export default router