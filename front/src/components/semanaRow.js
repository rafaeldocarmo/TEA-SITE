import React from 'react'
import { MultiSelect } from "primereact/multiselect";
import { Checkbox } from 'primereact/checkbox';

const SemanaRow = ({ data, atividade, sequenciaEscolhida, setSequenciaEscolhida, pacienteView }) => {
    
    // Seleciona a nova sequencia 
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
  
    // Muda o estado do checkbox para checkar as atividades
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

    // Remove a atividade selecionada
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
                <React.Fragment key={`${data.semana}-${index}`}>
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
                </React.Fragment>
              ))}
            </div>
            {!pacienteView && <>
                <MultiSelect 
                  value={atividadesDaSemana?.[data.semana]?.map(item => item.value) || ''}
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

export default SemanaRow
