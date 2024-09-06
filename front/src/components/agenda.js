import '../styles/agenda.scss'
import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { atividade } from "../mocks/atividades";
import { sequencia2 } from "../mocks/sequencia";
import { Tooltip } from 'primereact/tooltip';
import { ProgressBar } from 'primereact/progressbar';
import { prepareDataForBackend, transformData, calcularProgresso } from '../components/utils'
import SemanaRow from "../components/semanaRow";

const Agenda = () => {

    const [sequenciaEscolhidaBack, setSequenciaEscolhidaBack] = useState([]);
    const [userType, setUserType] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [cronoId, setCronoId] = useState(false);
    
    
    const onSaveSequencia = async () => {
      const userId = 2;
      try {
          const response = await fetch('http://localhost:8800/api/cronograma', {
              method: isEdit ? 'PUT' : 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                ...prepareDataForBackend(sequenciaEscolhidaBack),
                user_id: userId,
                id: cronoId
              })
            });
            fetchSchedules();
  
          if (response.ok) {
              fetchSchedules()
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
          setIsEdit(true)
          const data = await response.json();
          setCronoId(data[0].id)
          setSequenciaEscolhidaBack(transformData(data[0]));
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
        fetchSchedules()
    },[])


  return (
    <div className="tabela-de-sequencia">
          <table>
            <thead>
              <tr>
                <th>
                  Agenda de Atividades
                  <i className="question pi pi-question-circle" 
                    data-pr-tooltip={
                      userType === 'Terapeuta' ?
                      "Para montar sua agenda semanal, clique no ícone de mais (+) ao lado da semana e escolha as atividades que deseja adicionar. Fácil e rápido!"
                      :
                      "Clique nas atividades que já foram realizadas, e acompanhe sua evolução na barra de progresso."
                    }
                    data-pr-position="left"
                  />
                  <Tooltip target=".question" className="tooltip-question"/>
                </th>
              </tr>
            </thead>
            <tbody>
                {sequencia2.map((data, index) => {
                    return (
                        <SemanaRow
                          key={index} 
                          data={data} 
                          atividade={atividade}
                          sequenciaEscolhida={sequenciaEscolhidaBack}
                          setSequenciaEscolhida={setSequenciaEscolhidaBack}
                          pacienteView={userType === 'terapeuta' ? false : true}
                        />
                    );
                })}
            </tbody>
          </table>
          {userType === 'terapeuta' ? (
            <Button 
              label="Salvar Cronograma"
              onClick={onSaveSequencia}
            />
          ) : (
            <ProgressBar value={calcularProgresso(sequenciaEscolhidaBack)}></ProgressBar>
          )}
      </div>
  )
}

export default Agenda
