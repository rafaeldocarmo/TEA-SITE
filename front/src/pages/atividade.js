import { useParams, useNavigate, Link } from "react-router-dom";
import React from 'react'
import { atividade } from "../mocks/atividades";
import login from '../images/login.png'
import { Button } from 'primereact/button';

const Atividade = () => {

  const { slug } = useParams();
  const navigate = useNavigate();

  let currentCategory, currentActivity;
  for (const category of atividade) {
    const item = category.items.find(item => item.slug === slug);
    if (item) {
      currentCategory = category.name;
      currentActivity = item;
      break;
    }
  }

  const allItems = atividade.flatMap(categoria => categoria.items);
  const currentIndex = allItems.findIndex(item => item.slug === slug);

  const goToNextActivity = () => {
    if (currentIndex < allItems.length - 1) {
      const nextSlug = allItems[currentIndex + 1].slug;
      navigate(`/atividades/${nextSlug}`);
    }
  };

  const goToPreviousActivity = () => {
    if (currentIndex > 0) {
      const previousSlug = allItems[currentIndex - 1].slug;
      navigate(`/atividades/${previousSlug}`);
    }
  };

  if (!currentActivity) {
    return <p>Atividade não encontrada.</p>;
  }

  return (
    <div className="activies">

        <Button
          label="Anterior"
          onClick={goToPreviousActivity} 
        />
        <Button
          label="Próxima"
          onClick={goToNextActivity} 
        />

        <h2><Link to='/#section'>{currentCategory}</Link> - {currentActivity.nome}</h2>

        <div className="activies-grid">
          <div className="box">
            <p className="title">Objetivos da Atividade</p>
            <p>{currentActivity.objetivo}</p>
          </div>

          <div className="box">
            <p className="title">Materiais</p>
            <p>{currentActivity.materiais}</p>
          </div>

          <div className="box">
            <p className="title">Descrição</p>
            <p>{currentActivity.descricao}</p>
          </div>

          {currentActivity.duracao && 
          <div className="box">
            <p className="title">Duração</p>
            <p>{currentActivity.duracao} minutos</p>
          </div>}
        </div>

        <div className='img-div'>
            <img src={login} alt='criança brincando' />
        </div>
    </div>
  )
}

export default Atividade
