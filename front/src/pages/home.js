import "../styles/App.scss";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import { atividade, treeTableAtv } from "../mocks/atividades";
import { sequencia, sequencia2 } from "../mocks/sequencia";
import { MultiSelect } from "primereact/multiselect";
import Banner from "../components/banner";
import { Tooltip } from 'primereact/tooltip';
import banner from '../images/banner.png'
import midbanner from '../images/mid-banner.png'
import { Checkbox } from 'primereact/checkbox';
import { TabView, TabPanel } from 'primereact/tabview';
import { ProgressBar } from 'primereact/progressbar';
import Accordions from "../components/accordions";        

function Home() {

  const [dataSequencia, setDataSequencia] = useState([])
  const [sequenciaEscolhida, setSequenciaEscolhida] = useState([]);
  const [sequenciaEscolhidaBack, setSequenciaEscolhidaBack] = useState([]);

  useEffect(() => {
      sequencia.getTreeTableNodes().then((data) => setDataSequencia(data));
  }, []);



  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  
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
                    <label htmlFor={`checkbox-${data.semana}-${index}`} key={index} className={item.isCheck ? 'check' : ''}>
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

function transformData(input) {
  const result = [];

  for (let i = 1; i <= 8; i++) {
      const weekKey = `week_${i}`;
      if (input[weekKey]) {
          // Extrai o nome e o status do texto
          const [nome, isCheckStr] = input[weekKey].split('(');
          const isCheck = isCheckStr && isCheckStr.replace(')', '').trim() === 'true';
          
          // Adiciona ao resultado
          result.push({
              [`Semana ${i}`]: [
                  {
                      nome: nome.trim(),
                      isCheck: isCheck
                  }
              ]
          });
      }
  }

  return result;
}


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
