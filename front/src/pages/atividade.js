import { useParams } from "react-router-dom";
import React from 'react'
import { atividade } from "../mocks/atividades";

const Atividade = () => {

  const { slug } = useParams();
  const activity = atividade.find(activity => activity.slug === slug);
  console.log(slug)
  console.log(activity)

  if (!activity) {
    return <p>Atividade não encontrada.</p>;
  }

  return (
    <div className="activies">

        <h2>{activity.nome}</h2>

        <div className="activies-grid">
          <div className="box">
            <p className="title">Objetivos da Atividade</p>
            <p>{activity.objetivo}</p>
          </div>

          <div className="box">
            <p className="title">Materiais</p>
            <p>{activity.materiais}</p>
          </div>

          <div className="box">
            <p className="title">Descrição</p>
            <p>{activity.descricao}</p>
          </div>

          {activity.duracao && 
          <div className="box">
            <p className="title">Duração</p>
            <p>{activity.duracao} minutos</p>
          </div>}
        </div>
    </div>
  )
}

export default Atividade
