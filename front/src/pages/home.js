import "../styles/App.scss";
import "primereact/resources/themes/lara-light-cyan/theme.css";
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
      <Banner img={banner} title="Estimulando criança com TEA"/>

      <Accordions />

      <div id="quemsomos">
        <QuemSomos />
      </div>

      <Banner img={midbanner} title="MONTE SUA AGENDA DE ATIVIDADES"/>

      <Agenda />
    </>
  );
}

export default Home;
