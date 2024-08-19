import "../styles/App.scss";
import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionTab } from "primereact/accordion";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { atividade } from "../mocks/atividades";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { sequencia } from "../mocks/sequencia";


function Home() {
  const stepperRef = useRef(null);
  const navigate = useNavigate();

  const accordionHeader = (text) => {
    return(
      <>
        <i className="pi pi-comments"></i>
        <p>{text}</p>
        <i className="pi pi-angle-down"></i>
      </>
    )
  }

  const onRowSelect = (e) => {
    const selectedAtividade = e.data;
    navigate(`/atividades/${selectedAtividade.slug}`);
  };


  return (
    <>
      <Accordion collapseIcon expandIcon className="home-accordion">
        <AccordionTab header={accordionHeader('Conversando sobre TEA')}>
          <p className="m-0">
            O Transtorno do Espectro Autista (TEA) é um transtorno do neurodesenvolvimento, caracterizado pelas dificuldades de comunicação e interação social e também comportamentos restritos e repetitivos. 
            <br /><br />
            Para um melhor prognóstico, é essencial que a criança com TEA seja estimulada precocemente.
            <br /><br />
            Esse App se destina a pais e cuidadores com objetivo de orientar e apresentar um Protocolo de Estimulação para crianças com TEA desenvolvido e apresentado no Programa de Pós Graduação Scritu Sensu em Distúrbios do Desenvolvimento.    
          </p>
        </AccordionTab>
        <AccordionTab header={accordionHeader('Orientações')}>
          <Stepper ref={stepperRef} style={{ flexBasis: '10rem' }} className="home-stepper">
            <StepperPanel >
              <p>Este é um App destinado a pais e terapeutas e contém 1 Protocolo  de Estimulação Psicomotora para criança com TEA a fim de estimular o desenvolvimento psicomotor. </p>
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
            </StepperPanel>
            <StepperPanel>
              <p>As atividades estão organizadas em uma  lista, e você poderá escolher a sequencia a ser realizada ou seguir uma sugestão do App.</p>
              <Button label="Prev" icon="pi pi-arrow-left" iconPos="left" onClick={() => stepperRef.current.prevCallback()} />
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
            </StepperPanel>
            <StepperPanel>
              <p>Antes de iniciar as atividades, organize o material e o ambiente previamente.</p>
              <Button label="Prev" icon="pi pi-arrow-left" iconPos="left" onClick={() => stepperRef.current.prevCallback()} />
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
            </StepperPanel>
            <StepperPanel>
              <p>Após a preparação do ambiente, inicie as atividades e não esqueça de se divertir com seu filho. </p>
              <Button label="Prev" icon="pi pi-arrow-left" iconPos="left" onClick={() => stepperRef.current.prevCallback()} />
            </StepperPanel>
          </Stepper>
        </AccordionTab>
        <AccordionTab header={accordionHeader('Intervenções')}>
          <p className="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio cumque nihil impedit quo minus.
          </p>
        </AccordionTab>
      </Accordion>

      <DataTable value={atividade} className="tabela-de-atividades" paginator rows={8} selectionMode="single" onRowSelect={onRowSelect}>
          <Column field="id" header="N°" ></Column>
          <Column field="nome" header="Nome"></Column>
      </DataTable>
            
      <DataTable value={sequencia} className="sugestao-de-sequencia"  rows={8} selectionMode="single" onRowSelect={onRowSelect}>
       <Column field="semana" header="Sugestão de sequência de atividades"></Column>
       
      </DataTable>
    </>
  );
}

export default Home;
