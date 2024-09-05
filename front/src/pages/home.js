import "../styles/App.scss";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import React from "react";
import Banner from "../components/banner";
import banner from '../images/banner.png'
import midbanner from '../images/mid-banner.png'
import Accordions from "../components/accordions";
import Agenda from "../components/agenda";

function Home() {

  return (
    <>
      <Banner img={banner} title="APRENDENDO A ESTIMULAR A CRIANÇA COM TEA"/>

      <Accordions />

      <Banner img={midbanner} title="MONTE SUA AGENDA DE ATIVIDADES"/>

      <Agenda />
    </>
  );
}







export default Home;
