import "../styles/App.scss";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionTab } from "primereact/accordion";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { atividade, treeTableAtv } from "../mocks/atividades";
import { sequencia, sequencia2 } from "../mocks/sequencia";
import { TreeTable } from 'primereact/treetable';
import { OverlayPanel } from 'primereact/overlaypanel';
import { MultiSelect } from "primereact/multiselect";
import Banner from "../components/banner";
import { Tooltip } from 'primereact/tooltip';
import banner from '../images/banner.png'
import midbanner from '../images/mid-banner.png'
import { Checkbox } from 'primereact/checkbox';
import { TabView, TabPanel } from 'primereact/tabview';
import { ProgressBar } from 'primereact/progressbar';
import { Tree } from 'primereact/tree';
        

        

        


function Home() {
  const stepperRef = useRef(null);
  const navigate = useNavigate();

  const [dataSequencia, setDataSequencia] = useState([])
  const [dataAtividades, setDataAtividades] = useState([])
  const [sequenciaEscolhida, setSequenciaEscolhida] = useState([]);
  const [sequenciaEscolhidaBack, setSequenciaEscolhidaBack] = useState([]);


  useEffect(() => {
      sequencia.getTreeTableNodes().then((data) => setDataSequencia(data));
      treeTableAtv.getTreeAtividade().then((data) => setDataAtividades(data));
  }, []);

  useEffect(() => {
      console.log("data", calcularProgresso(sequenciaEscolhida))
      setSequenciaEscolhidaBack(prepareDataForBackend(sequenciaEscolhida))
  }, [sequenciaEscolhida]);
  // useEffect(() => {
  //     console.log("data", parseBackendData(sequenciaEscolhidaBack))
  // }, [sequenciaEscolhidaBack]);




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
    const selectedAtividade = e.node;
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
            <Tree value={dataAtividades} className="tabela-de-atividades" selectionMode="single" onSelect={onRowSelect} showHeader={false} />
            
        </AccordionTab>
      </Accordion>

      <Banner img={midbanner} title="MONTE SUA AGENDA DE ATIVIDADES"/>

      <TabView>
        <TabPanel header="Terapeuta">
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
                        return (
                            <SemanaRow 
                              data={data} 
                              atividade={atividade}
                              sequenciaEscolhida={sequenciaEscolhida}
                              setSequenciaEscolhida={setSequenciaEscolhida}
                            />
                        );
                    })}
                </tbody>
              </table>
          </div>
        </TabPanel>
        <TabPanel header="Paciente">
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
                        return (
                            <SemanaRow 
                              data={data} 
                              atividade={atividade}
                              sequenciaEscolhida={sequenciaEscolhida}
                              setSequenciaEscolhida={setSequenciaEscolhida}
                              pacienteView
                            />
                        );
                    })}
                </tbody>
              </table>
              
              <ProgressBar value={calcularProgresso(sequenciaEscolhida)}></ProgressBar>

          </div>
        </TabPanel>
      </TabView>

    </>
  );
}

const SemanaRow = ({ data, atividade, sequenciaEscolhida, setSequenciaEscolhida, pacienteView }) => {
  const op = useRef(null);

  const selectSequencia = (e) => {
    const selectedValues = e.value;
    const newSelection = selectedValues.map(value => {
      const option = atividade.flatMap(item => item.items).find(item => item.slug === value);
      return {
        nome: option.nome,
        value: option.slug,
        isCheck: false 
      };
    });

    const updatedSequenciaEscolhida = sequenciaEscolhida.map(item => 
      item[data.semana] ? { [data.semana]: newSelection } : item
    );

    if (!sequenciaEscolhida.some(item => item[data.semana])) {
      updatedSequenciaEscolhida.push({ [data.semana]: newSelection });
    }

    setSequenciaEscolhida(updatedSequenciaEscolhida);
  };

  const handleCheckboxChange = (semana, index) => {
    const updatedSequenciaEscolhida = sequenciaEscolhida.map(item => {
      if (item[semana]) {
        const updatedItems = item[semana].map((atividade, i) => 
          i === index ? { ...atividade, isCheck: !atividade.isCheck } : atividade
        );
        return { [semana]: updatedItems };
      }
      return item;
    });

    setSequenciaEscolhida(updatedSequenciaEscolhida);
  };

  const removeAtividade = (semana, indexToRemove) => {
    const updatedSequenciaEscolhida = sequenciaEscolhida.map(item => {
      if (item[semana]) {
        const updatedItems = item[semana].filter((_, index) => index !== indexToRemove);
        return { [semana]: updatedItems };
      }
      return item;
    });
  
    setSequenciaEscolhida(updatedSequenciaEscolhida);
  };

  const atividadesDaSemana = sequenciaEscolhida.find(item => item[data.semana]);

  return (
    <tr key={data.semana}>
      <td>
        <div>
          <p>{data.semana}</p>
          <div className="atividades-escolhidas">
            {atividadesDaSemana && atividadesDaSemana[data.semana]?.map((item, index) => (
              <>
                {pacienteView ? (
                  <> 
                    <Checkbox 
                      checked={item.isCheck} 
                      onChange={() => handleCheckboxChange(data.semana, index)}
                      className="checkbox-progress" 
                      inputId={`checkbox-${data.semana}-${index}`}
                    />
                    <label htmlFor={`checkbox-${data.semana}-${index}`} key={index} className={item.isCheck && 'check'}>
                      {item.nome}
                    </label>
                  </> 
                ) : (
                  <label key={index} onClick={() => removeAtividade(data.semana, index)}>
                      {item.nome}
                  </label>
                )}
              </>
            ))}
          </div>
          {!pacienteView && <>
              <MultiSelect 
                value={atividadesDaSemana?.[data.semana]?.map(item => item.value) || []}
                options={atividade} 
                optionLabel="nome" 
                optionValue="slug"
                optionGroupLabel="name" 
                optionGroupChildren="items"
                filter
                showSelectAll={false}
                placeholder="+"
                dropdownIcon='dropdwon-icon'
                className="multiselect-face"
                fixedPlaceholder
                scrollHeight={"300px"}
                panelClassName="multiselect-atividades"
                onChange={selectSequencia}>
              </MultiSelect>
          </>
          }
        </div>
      </td>          
    </tr>
  );
};

const prepareDataForBackend = (sequenciaEscolhida) => {
  const backendData = {};

  sequenciaEscolhida.forEach(semanaObj => {
    const [semana, atividades] = Object.entries(semanaObj)[0];
    const weekKey = `week_${semana.split(' ')[1]}`;
    const atividadesStr = atividades.map(atividade => 
      `${atividade.nome}(${atividade.isCheck})`
    ).join(', ');

    backendData[weekKey] = atividadesStr;
  });

  return backendData;
};

const parseBackendData = (backendData) => {
  const sequenciaEscolhida = [];

  Object.entries(backendData).forEach(([weekKey, atividadesStr]) => {
    const semana = `Semana ${weekKey.split('_')[1]}`;
    const atividades = atividadesStr.split(', ').map(atividadeStr => {
      const [nome, isCheck] = atividadeStr.match(/(.+)\((true|false)\)/).slice(1, 3);
      return {
        nome,
        value: nome.toLowerCase().replace(/\s+/g, '-'), // Assumindo que o value é o slug do nome
        isCheck: isCheck === 'true'
      };
    });

    sequenciaEscolhida.push({ [semana]: atividades });
  });

  return sequenciaEscolhida;
};

const calcularProgresso = (sequenciaEscolhida) => {
  let totalAtividades = 0;
  let atividadesConcluidas = 0;

  sequenciaEscolhida.forEach(semanaObj => {
    const atividades = Object.values(semanaObj)[0];
    totalAtividades += atividades.length;
    atividades.forEach(atividade => {
      if (atividade.isCheck) {
        atividadesConcluidas++;
      }
    });
  });

  const percentual = (atividadesConcluidas / totalAtividades) * 100;
  return Math.round(percentual); // Arredondar para o inteiro mais próximo
};




export default Home;
