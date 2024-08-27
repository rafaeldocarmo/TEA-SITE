import React, { useEffect, useState } from 'react'
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from "primereact/floatlabel";
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import login from '../images/login.png'
import '../styles/login.scss'
        

const Login = () => {
    const [user, setUser] = useState({})

    const OnSave = () => {
        console.log(user)
    }

  return (
    <section className='user-form'>
        
        <div className='form-login'>
            <h1>Cadastre-se</h1>

            <div className='flex-row'>
                <p>Usuário: </p>
                <div className='radio-button'>
                    <RadioButton inputId='terapeuta' name='user_type' value="terapeuta" onChange={(e) => setUser({...user, user_type: e.value})} checked={user.user_type === 'terapeuta'}/>
                    <label for="terapeuta">Terapeuta</label>
                </div>
                <div className='radio-button'>
                    <RadioButton inputId='pais' name='user_type' value="pais" onChange={(e) => setUser({...user, user_type: e.value})} checked={user.user_type === 'pais'}/>
                    <label for="pais">Pai/Mãe</label>
                </div>
                <div className='radio-button'>
                    <RadioButton inputId='cuidador' name='user_type' value="cuidador" onChange={(e) => setUser({...user, user_type: e.value})} checked={user.user_type === 'cuidador'}/>
                    <label for="cuidador">Outro cuidados</label>
                </div>
            </div>
            <div className='flex-row'>
                <FloatLabel>
                    <InputText id='resposible-name' onChange={(e) => setUser({...user, responsible_name: e.target.value})}/>
                    <label htmlFor="resposible-name">Nome do Responsável</label>
                </FloatLabel>
                <FloatLabel>
                    <InputText id='username' onChange={(e) => setUser({...user, name: e.target.value})}/>
                    <label htmlFor="username">Username</label>
                </FloatLabel>
            </div>
            <div className='flex-row'>
                <FloatLabel>
                    <InputText id="Email" type='email' onChange={(e) => setUser({...user, email: e.target.value})}/>
                    <label htmlFor="Email">Email</label>
                </FloatLabel>
                <FloatLabel>
                    <InputMask id="tel" type='tel' onChange={(e) => setUser({...user, telefone: e.value})} mask="(99)99999-9999"/>
                    <label htmlFor="tel">Telefone</label>
                </FloatLabel>
            </div>
            <div className='flex-row'>
                <FloatLabel>
                    <InputText id='nome-da-crianca' onChange={(e) => setUser({...user, children_name: e.target.value})}/>
                    <label htmlFor="nome-da-crianca">Nome da criança</label>
                </FloatLabel>
                <div className='flex-row'>
                    <p>Sexo: </p>
                    <div className='radio-button'>
                        <RadioButton inputId='masculino' name='genero' value="masculino" onChange={(e) => setUser({...user, genero: e.value})} checked={user.genero === 'masculino'}/>
                        <label for="masculino">Masculino</label>
                    </div>
                    <div className='radio-button'>
                        <RadioButton inputId='feminina' name='genero' value="feminina" onChange={(e) => setUser({...user, genero: e.value})} checked={user.genero === 'feminina'}/>
                        <label for="feminina">Feminina</label>
                    </div>
                </div>
            </div>
            <div className='flex-row'>
                <FloatLabel>
                    <InputText id="Idade" type='number' onChange={(e) => setUser({...user, Idade: e.target.value})}/>
                    <label htmlFor="Idade">Idade</label>
                </FloatLabel>
                
                <FloatLabel>
                    <InputMask id="data_de_nascimento" type='text' onChange={(e) => setUser({...user, data_de_nascimento: e.value})} mask="99/99/9999"/>
                    <label htmlFor="data_de_nascimento">Data de Nascimento</label>
                </FloatLabel>
            </div>
        
            <Button 
                label='Salvar'
                className='save-button'
                onClick={OnSave}
            />
        </div>
        <div className='img-div'>
            <img src={login} alt='criança brincando' />
        </div>

    </section>
  )
}

export default Login
