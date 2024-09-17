import '../styles/agenda.scss'
import '../styles/App.scss'
import React, { useState, useEffect, useContext, useRef } from "react";
import { Button } from 'primereact/button';
import { atividade } from "../mocks/atividades";
import { sequencia2 } from "../mocks/sequencia";
import { Tooltip } from 'primereact/tooltip';
import { ProgressBar } from 'primereact/progressbar';
import { prepareDataForBackend, transformData, calcularProgresso } from '../components/utils'
import SemanaRow from "../components/semanaRow";
import { AuthContext } from "../context/authProvider.js"
import { Link } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { fetchData } from '../components/utils';

const Agenda = () => {

    const [sequenciaEscolhidaBack, setSequenciaEscolhidaBack] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [cronoId, setCronoId] = useState(false);
    const toast = useRef()
    const { isAuthenticated, user, token } = useContext(AuthContext);
    
    const onSaveSequencia = async () => {
      try {
          const response = await fetch(`http://localhost:8800/api/cronograma/`, {
              method: isEdit ? 'PUT' : 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                ...prepareDataForBackend(sequenciaEscolhidaBack),
                user_id: user.id,
                id: cronoId
              })
            });
            fetchSchedules();
  
          if (response.ok) {
              fetchSchedules()
              toast.current.show({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Agenda adicionada com sucesso!',
                life: 3000
            });

          } else {
              console.error('Erro ao enviar cronograma:', response.status);
              toast.current.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao adicionar agenda.',
                life: 3000
            });

          }
      } catch (error) {
          console.error('Erro ao enviar cronograma:', error);
      }
    };
  
    const fetchSchedules = async () => {
      if(user){
        let data;
        if(user?.user_type_id !== 1){
          data = await fetchData(`http://localhost:8800/api/pacientes/${user?.id}?user_type_id=${user?.user_type_id}`, 'GET', null, token);
        }
        const endpoint = user?.user_type_id === 1 ? `http://localhost:8800/api/cronograma/${user?.id}` : data[0]?.status === 'check' ? `http://localhost:8800/api/cronograma/${data[0]?.user_id}` : ''
        try {
            const response = await fetch(endpoint, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
          });
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
    }

    useEffect(() => {
      fetchSchedules()
    },[user])

  
  
  return (
    <>
      <Toast ref={toast} />
      {isAuthenticated ?
      (sequenciaEscolhidaBack.length > 0 || user?.user_type_id === 1 ? 
      <div className="tabela-de-sequencia">
            <table>
              <thead>
                <tr>
                  <th>
                    Agenda de Atividades
                    <i className="question pi pi-question-circle" 
                      data-pr-tooltip={
                        user?.user_type_id === 1 ?
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
                            pacienteView={user?.user_type_id === 3 || user?.user_type_id === 2}
                          />
                      );
                  })}
              </tbody>
            </table>
            {user?.user_type_id === 1 ? (
              <Button 
                label={isEdit ? "Editar Cronograma" : "Salvar Cronograma"}
                onClick={onSaveSequencia}
              />
            ) : (
              <ProgressBar value={calcularProgresso(sequenciaEscolhidaBack)}></ProgressBar>
            )}
      </div> : 
      <div className='not-logged'>
        <i className='pi pi-exclamation-circle'></i>
        <p>Você ainda não possui uma agenda, entre em contato com seu terapeuta para visualizar.</p>
      </div>):
      <div className='not-logged'>
        <i className='pi pi-exclamation-circle'></i>
        <p>Está seção é destinada para montagem e visualização das agendas. Para ter acesso você deve fazer <Link to='/login'>login</Link></p>
      </div>}
    </>
  )
}

export default Agenda
