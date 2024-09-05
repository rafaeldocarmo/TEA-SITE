import "../styles/App.scss";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { atividade } from "../mocks/atividades";
import { sequencia, sequencia2 } from "../mocks/sequencia";
import Banner from "../components/banner";
import { Tooltip } from 'primereact/tooltip';
import banner from '../images/banner.png'
import midbanner from '../images/mid-banner.png'
import { TabView, TabPanel } from 'primereact/tabview';
import { ProgressBar } from 'primereact/progressbar';
import Accordions from "../components/accordions";
import { prepareDataForBackend, transformData, calcularProgresso } from '../components/utils'
import SemanaRow from "../components/semanaRow";

function Home() {

  const [dataSequencia, setDataSequencia] = useState([])
  const [sequenciaEscolhida, setSequenciaEscolhida] = useState([]);
  const [sequenciaEscolhidaBack, setSequenciaEscolhidaBack] = useState([]);
  const [userType, setUserType] = useState('paciente');

  useEffect(() => {
      sequencia.getTreeTableNodes().then((data) => setDataSequencia(data));
  }, []);
  
  const onSaveSequencia = async () => {
    const userId = 2;
    try {
        const response = await fetch('http://localhost:8800/api/cronograma', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                ...prepareDataForBackend(sequenciaEscolhida)
            })
          });
          fetchSchedules();

        if (response.ok) {
            const data = await response.json();
            console.log('Cronograma enviado com sucesso:', data);
        } else {
            console.error('Erro ao enviar cronograma:', response.status);
        }
    } catch (error) {
        console.error('Erro ao enviar cronograma:', error);
    }
  };

  const fetchSchedules = async () => {
    try {
        const response = await fetch(`http://localhost:8800/api/cronograma/2`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSequenciaEscolhidaBack(transformData(data[0]));
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Banner img={banner} title="APRENDENDO A ESTIMULAR A CRIANÇA COM TEA"/>

      <Accordions />

      <Banner img={midbanner} title="MONTE SUA AGENDA DE ATIVIDADES"/>


      <div className="tabela-de-sequencia">
          <table>
            <thead>
              <td>
                Agenda de Atividades
                <i className="question pi pi-question-circle" 
                  data-pr-tooltip={
                    userType === 'Terapeuta' ?
                    "Para montar sua agenda semanal, clique no ícone de mais (+) ao lado da semana e escolha as atividades que deseja adicionar. Fácil e rápido!"
                    :
                    "Para montar sua agenda semanal, clique no ícone de mais (+) ao lado da semana e escolha as atividades que deseja adicionar. Fácil e rápido!"
                  }
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
                          sequenciaEscolhida={userType === 'terapeuta' ? sequenciaEscolhida : sequenciaEscolhidaBack}
                          setSequenciaEscolhida={userType === 'terapeuta' ? setSequenciaEscolhida : setSequenciaEscolhidaBack}
                          pacienteView={userType === 'terapeuta' ? false : true}
                        />
                    );
                })}
            </tbody>
            {userType === 'terapeuta' ? (
              <Button 
                label="Salvar Cronograma"
                onClick={onSaveSequencia}
              />
            ) : (
              <ProgressBar value={calcularProgresso(sequenciaEscolhidaBack)}></ProgressBar>
            )}
          </table>
      </div>

      <TabView>
        <TabPanel header="Terapeuta">
          <div className="tabela-de-sequencia">
              <table>
                <thead>
                  <td>
                    Agenda de Atividades
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
                <Button 
                  label="Salvar Cronograma"
                  onClick={onSaveSequencia}
                />
              </table>
          </div>
        </TabPanel>
        <TabPanel header="Paciente">
          <div className="tabela-de-sequencia">
              <table>
                <thead>
                  <td>
                    Agenda de Atividades
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
                              sequenciaEscolhida={sequenciaEscolhidaBack}
                              setSequenciaEscolhida={setSequenciaEscolhidaBack}
                              pacienteView
                            />
                        );
                    })}
                </tbody>
              </table>
              
              <ProgressBar value={calcularProgresso(sequenciaEscolhidaBack)}></ProgressBar>

          </div>
        </TabPanel>
      </TabView>
    </>
  );
}







export default Home;
