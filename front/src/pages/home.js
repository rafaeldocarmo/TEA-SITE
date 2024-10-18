import "../styles/App.scss";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Link } from 'react-router-dom';
import React, { useEffect } from "react";
import Banner from "../components/banner";
import banner from '../images/logoteatranspsemf.png'
import midbanner from '../images/mid-banner.png'
import Accordions from "../components/accordions";
import Agenda from "../components/agenda";
import QuemSomos from "../components/quemsomos";

function Home() {

  return (
    <>
      <div className='banner'>
        <div>
          <img src={banner} alt="banner" />
        </div>
        <div className="cardbanner">
        <div>
          <h1>Estimulando criança com TEA</h1>
        </div>
        <div>
          <h3>Acesse e acompanhe a programação desenvolvida especialmente para apoiar o desenvolvimento do seu filho!</h3>
        </div>
        <div><Link className='button button-primary' to="/login">EXPERIMENTE GRÁTIS</Link></div>
        <div><Link className='button button-secondary' to="/contato">CONVERSAR COM A GENTE</Link></div>
        </div>
      </div>

      <Accordions />

      <div id="quemsomos">
        <QuemSomos />
      </div>

      <Banner img={midbanner} title="MONTE SUA AGENDA DE ATIVIDADES" />

      <Agenda />
    </>
  );
}

export default Home;
