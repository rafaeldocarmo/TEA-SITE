import '../styles/profile.scss'
import React, { useState } from 'react'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import midbanner from '../images/mid-banner.png'
import { Dropdown } from 'primereact/dropdown';

const Perfil = () => {
    const [isPerfil, setIsPerfil] = useState(true)
    const [terapeuta, setTerapeuta] = useState(null);

    const terapeutas = [
      { label: "Terapeuta A", value: "a" },
      { label: "Terapeuta B", value: "b" },
      { label: "Terapeuta C", value: "c" }
    ];

    return (
    <div className='profile-container'>
        <div className='profile-container-content'>
            <img src={midbanner} />

            {isPerfil ? (
                <div>
                    <h1>Bem vindo, Usuário</h1>

                    <InputText id='responsible-name' placeholder='Username'/>
                    <InputText id='responsible-name' placeholder='Telefone'/>
                    <InputText id='responsible-name' placeholder='Nome da criança'/>
                    <InputText id='responsible-name' placeholder='Idade'/>
                    <InputText id='responsible-name' placeholder='Email'/>
                    <InputText id='responsible-name' placeholder='Nome do Responsável'/>
                </div>
                ) : (
                <div>
                    <h1>Envie uma solicitação </h1>
                    <h5> Encontre o seu terapeuta no dropdown abaixo e envie uma solicitação de amizade.
                    Assim que ele aceitar, você poderá visualizar a agenda que ele criou. </h5>

                    <Dropdown
                        value={terapeuta}
                        options={terapeutas}
                        onChange={(e) => setTerapeuta(e.value)}
                        placeholder="Selecione um terapeuta"
                        filter
                    />
                </div>
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
        {isPerfil ? (
            <Button
                className='edit' 
                label='Editar Informações'
            />
        ):(
            <Button
                className='edit' 
                label='Enviar solicitação'
            />
        )}
    </div>
  )
}

export default Perfil
