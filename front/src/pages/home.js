import "../styles/App.scss";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionTab } from "primereact/accordion";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { atividade, treeTableAtv } from "../mocks/atividades";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { sequencia, sequencia2 } from "../mocks/sequencia";
import { TreeTable } from 'primereact/treetable';
import { OverlayPanel } from 'primereact/overlaypanel';
import { MultiSelect } from "primereact/multiselect";
import Banner from "../components/banner";
import { Tooltip } from 'primereact/tooltip';
import banner from '../images/banner.png'
import midbanner from '../images/mid-banner.png'

        


function Home() {
  const stepperRef = useRef(null);
  const navigate = useNavigate();

  const [dataSequencia, setDataSequencia] = useState([])
  const [dataAtividades, setDataAtividades] = useState([])

  useEffect(() => {
      sequencia.getTreeTableNodes().then((data) => setDataSequencia(data));
      treeTableAtv.getTreeAtividade().then((data) => setDataAtividades(data));
  }, []);
  useEffect(() => {
      console.log("data",dataAtividades)
  }, [dataAtividades]);


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
    console.log(e)
    const selectedAtividade = e.node.data;
    if(selectedAtividade.slug !== ''){
      navigate(`/atividades/${selectedAtividade.slug}`);
    }
  };


  return (
    <>
      <Banner img={banner} title="APRENDENDO A ESTIMULAR A CRIANÇA COM TEA"/>


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
              <Button label="Próximo" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
            </StepperPanel>
            <StepperPanel>
              <p>As atividades estão organizadas em uma  lista, e você poderá escolher a sequencia a ser realizada ou seguir uma sugestão do App.</p>
              <Button label="Prévio" icon="pi pi-arrow-left" iconPos="left" onClick={() => stepperRef.current.prevCallback()} />
              <Button label="Próximo" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
            </StepperPanel>
            <StepperPanel>
              <p>Antes de iniciar as atividades, organize o material e o ambiente previamente.</p>
              <Button label="Prévio" icon="pi pi-arrow-left" iconPos="left" onClick={() => stepperRef.current.prevCallback()} />
              <Button label="Próximo" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
            </StepperPanel>
            <StepperPanel>
              <p>Após a preparação do ambiente, inicie as atividades e não esqueça de se divertir com seu filho. </p>
              <Button label="Prévio" icon="pi pi-arrow-left" iconPos="left" onClick={() => stepperRef.current.prevCallback()} />
            </StepperPanel>
          </Stepper>
        </AccordionTab>


        <AccordionTab header={accordionHeader('Intervenções')}>
            <TreeTable value={dataAtividades} className="tabela-de-atividades" selectionMode="single" onSelect={onRowSelect} >
                <Column field="name" expander headerStyle={{display: 'none'}}></Column>
            </TreeTable>
        </AccordionTab>
      </Accordion>

      <Banner img={midbanner} title="MONTE SUA AGENDA DE ATIVIDADES"/>

      <div className="tabela-de-sequencia">
          <table>
            <thead>
              <td>
                Agenda de atividades
                <i className="question pi pi-question-circle" 
                data-pr-tooltip ="Para montar sua agenda semanal, clique no ícone de mais (+) ao lado da semana e escolha as atividades que deseja adicionar. Fácil e rápido!"
                data-pr-position="left"
                />
                <Tooltip target=".question" className="tooltip-question"/>
              </td>
            </thead>
            <tbody>
                {sequencia2.map((data) => {
                  console.log(data)
                    return (
                        <SemanaRow 
                          data={data} 
                          atividade={atividade}
                        />
                    );
                })}
            </tbody>
          </table>
      </div>

    </>
  );
}

const SemanaRow = ({ data, atividade }) => {
  const op = useRef(null);
  const [sequenciaEscolhida, setSequenciaEscolhida] = useState([]);


  const selectSequencia = (e) => {
    const selectedValues = e.value;
    const newSelection = selectedValues.map(value => {
      const option = atividade.flatMap(item => item.items).find(item => item.slug === value);
      return {
        nome: option.nome,
        value: option.slug
      };
    });
    console.log(newSelection)
    setSequenciaEscolhida(newSelection);
  };

  return (
    <tr key={data.semana}>
      <td>
          <div>
              <p>{data.semana}</p>
              <div className="atividades-escolhidas">
                  {sequenciaEscolhida.length > 0 && sequenciaEscolhida.map((item, index) => (
                      <span key={index}>{item.nome}</span>
                  ))}
              </div>
              <button onClick={(e) => op.current.toggle(e)}>+</button>
              <OverlayPanel ref={op}>
                  <MultiSelect 
                      value={sequenciaEscolhida?.map(item => item.value)}
                      options={atividade} 
                      optionLabel="nome" optionValue="slug"
                      optionGroupLabel="name" optionGroupChildren="items"
                      filter
                      showSelectAll="false"
                      placeholder="Selecione as atividades"
                      fixedPlaceholder
                      panelClassName="multiselect-atividades"
                      onChange={selectSequencia}>
                  </MultiSelect>
              </OverlayPanel>
          </div>
      </td>          
    </tr>
);
};

export default Home;
