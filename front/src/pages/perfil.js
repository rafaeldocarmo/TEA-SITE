import '../styles/profile.scss'
import React, { useEffect, useState, useContext } from 'react'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import midbanner from '../images/mid-banner.png'
import { Dropdown } from 'primereact/dropdown';
import { AuthContext } from '../context/authProvider';
import { fetchData } from '../components/utils';
import { TabView, TabPanel } from 'primereact/tabview';

const Perfil = () => {
    const [isPerfil, setIsPerfil] = useState(true)
    const [isTerapeuta, setIsTerapeuta] = useState(true)
    const [terapeuta, setTerapeuta] = useState(null);
    const [listaTerapeutas, setListaTerapeutas] = useState([]);
    const [listOfRelations, setListOfRelations] = useState()
    const { isAuthenticated, user, token } = useContext(AuthContext);

    // Método para buscas os pacientes disponiveis
    const fetchAllPacients = async () => {
        const endpoint = isTerapeuta ? `http://localhost:8800/api/terapeutas/1` : `http://localhost:8800/api/terapeutas`;
        try {
            const data = await fetchData(endpoint, 'GET', null, token);
            setListaTerapeutas(data);
        } catch (error) {
            console.log(error);
        }
    };    

    // Método para enviar solicitacão de amizades
    const sendRequest = async () => {
        try {
            const data = await fetchData('http://localhost:8800/api/request', 'POST', { therapist_id: terapeuta, patient_id: user?.id }, token);
    
            if (data) {
                fetchAllPacients();
                countRelations();
            }
        } catch (error) {
            console.error('Erro ao enviar cronograma:', error);
        }
    }

    // Método para aceitar solicitacão de amizades
    const onAccept = async (idPaciente) => {
        try {
            const data = await fetchData('http://localhost:8800/api/terapeutas', 'POST', { therapist_id: user?.id, patient_id: idPaciente }, token);
            if (data) {
                fetchAllPacients();
            }
        } catch (error) {
            console.error('Erro ao enviar cronograma:', error);
        }
    };

    // Método para trazer as amizades
    const countRelations = async () => {
        try {
            const data = await fetchData(`http://localhost:8800/api/request/${user?.id}`, 'GET', null, token);
            setListOfRelations(data)
        } catch (error) {
            console.log(error);
        }
    };    



    useEffect(() => {
        fetchAllPacients();
        if(user) countRelations();
    }, [])
  

    return (
    <div className='profile-container'>
        <div className='profile-container-content'>
            <img src={midbanner} />

            {isPerfil ? (
                <>
                    <div>
                        <h1>Bem vindo, Usuário</h1>

                        <InputText id='responsible-name' placeholder='Username'/>
                        <InputText id='responsible-name' placeholder='Telefone'/>
                        <InputText id='responsible-name' placeholder='Nome da criança'/>
                        <InputText id='responsible-name' placeholder='Idade'/>
                        <InputText id='responsible-name' placeholder='Email'/>
                        <InputText id='responsible-name' placeholder='Nome do Responsável'/>
                    </div>
                    <Button
                        className='edit' 
                        label='Editar Informações'
                    />
                </>
            ) : (
                isTerapeuta ? (
                    <TabView className="perfil-tab">
                        <TabPanel header="Adicione pacientes" > 
                            <h1>Envie uma solicitação </h1>
                            <h5> Encontre o seu paciente no dropdown abaixo e envie uma solicitação de amizade.
                            Assim que ele aceitar, ele poderá visualizar a agenda que você criou. </h5>
                            <Dropdown
                                value={terapeuta}
                                options={listaTerapeutas}
                                optionLabel='name'
                                optionValue='id'
                                onChange={(e) => setTerapeuta(e.value)}
                                placeholder="Selecione um terapeuta"
                                filter
                                panelClassName="dropdown-terapeutas"
                            />
                            <Button
                                className='edit' 
                                label='Enviar solicitação'
                                onClick={() => sendRequest()}
                            />
                        </TabPanel>
                        <TabPanel header='Seus pacientes'>
                            <h1>Seus pacientes</h1>
                            <h5>Aqui você pode visualizar quem é são seus atuais pacientes. </h5>
                            {listOfRelations.length > 0 ? listOfRelations.map((item) => {
                            return (
                                <div className='accept-card' key={item.id}>
                                    <div className='accept-card-body'>
                                        <p>Responsável: {item.nome}</p>
                                        <p>Criança: {item.child_name}</p>
                                        <p>{item.email}</p>
                                    </div>
                                    <div>
                                        <Button icon="pi pi-check" onClick={() => onAccept(item.id)} />
                                        <Button icon="pi pi-times" />
                                    </div>
                                </div>
                            )
                        }) : <p><i className='pi pi-exclamation-circle'></i> Você não possui solicitações ou pacientes</p>}
                        </TabPanel>
                    </TabView>
                ) : (
                    <div>
                        <h1>Visualize suas solicitações </h1>
                        <h5> Encontre as solicitacão de amizade do seu terapeuta </h5>.

                        {listOfRelations.length > 0 ? listOfRelations.map((item) => {
                            return (
                                <div className='accept-card' key={item.id}>
                                    <div className='accept-card-body'>
                                        <p>Responsável: {item.nome}</p>
                                        <p>Criança: {item.child_name}</p>
                                        <p>{item.email}</p>
                                    </div>
                                    <div>
                                        <Button icon="pi pi-check" onClick={() => onAccept(item.id)} />
                                        <Button icon="pi pi-times" />
                                    </div>
                                </div>
                            )
                        }) : <p><i className='pi pi-exclamation-circle'></i> Você não possui solicitações</p>}
                    </div>
                    
                )
            )}
        </div>
        <div className='selectTab'>
            <Button 
               icon="pi pi-user"
               className={isPerfil ? 'check' : ''}
               onClick={() => setIsPerfil(true)}
            />
            <Button 
               className={isPerfil ? '' : 'check'}
               icon="pi pi-calendar-plus"
               onClick={() => setIsPerfil(false)}
            />
        </div>
    </div>
  )
}

export default Perfil
