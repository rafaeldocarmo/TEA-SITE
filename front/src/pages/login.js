import React, { useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from "primereact/floatlabel";
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import login from '../images/login.png';
import '../styles/login.scss';
import { BreadCrumb } from 'primereact/breadcrumb';

const Login = () => {
    const [user, setUser] = useState({});
    const [isRegistering, setIsRegistering] = useState(false);

    const OnSave = () => {
        if (isRegistering) {
            console.log('Cadastro:', user);
        } else {
            console.log('Login:', user);
        }
    };

    const items = [{label: !isRegistering ? 'Login' : 'Cadastro', url: `/login` }];
    const home = { icon: 'pi pi-home', url: '/' }
  

    return (
        <>
        <BreadCrumb home={home} model={items}/>

        <section className='user-form'>
            <div className='form-login'>
                <h1>{isRegistering ? 'Cadastre-se' : 'Login'}</h1>

                {!isRegistering ? (
                    <>
                        <div className='flex-row'>
                            <FloatLabel>
                                <InputText id="Email" type='email' onChange={(e) => setUser({...user, email: e.target.value})}/>
                                <label htmlFor="Email">Email</label>
                            </FloatLabel>
                            <FloatLabel>
                                <InputText id='password' type='password' onChange={(e) => setUser({...user, senha: e.target.value})}/>
                                <label htmlFor="password">Senha</label>
                            </FloatLabel>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex-row'>
                            <p>Usuário: </p>
                            <div className='radio-button'>
                                <RadioButton inputId='terapeuta' name='user_type' value="terapeuta" onChange={(e) => setUser({...user, user_type: e.value})} checked={user.user_type === 'terapeuta'}/>
                                <label htmlFor="terapeuta">Terapeuta</label>
                            </div>
                            <div className='radio-button'>
                                <RadioButton inputId='pais' name='user_type' value="pais" onChange={(e) => setUser({...user, user_type: e.value})} checked={user.user_type === 'pais'}/>
                                <label htmlFor="pais">Pai/Mãe</label>
                            </div>
                            <div className='radio-button'>
                                <RadioButton inputId='cuidador' name='user_type' value="cuidador" onChange={(e) => setUser({...user, user_type: e.value})} checked={user.user_type === 'cuidador'}/>
                                <label htmlFor="cuidador">Outro cuidador</label>
                            </div>
                        </div>
                        <div className='flex-row'>
                            <FloatLabel>
                                <InputText id='responsible-name' onChange={(e) => setUser({...user, responsible_name: e.target.value})}/>
                                <label htmlFor="responsible-name">Nome do Responsável</label>
                            </FloatLabel>
                            <FloatLabel>
                                <InputMask id="tel" type='tel' onChange={(e) => setUser({...user, telefone: e.value})} mask="(99)99999-9999"/>
                                <label htmlFor="tel">Telefone</label>
                            </FloatLabel>
                        </div>
                        <div className='flex-row'>
                            <FloatLabel>
                                <InputText id="Email" type='email' onChange={(e) => setUser({...user, email: e.target.value})}/>
                                <label htmlFor="Email">Email</label>
                            </FloatLabel>
                            <FloatLabel>
                                <InputText id='password' type='password' onChange={(e) => setUser({...user, senha: e.target.value})}/>
                                <label htmlFor="password">Senha</label>
                            </FloatLabel>
                        </div>
                        <div className='flex-row'>
                            <FloatLabel>
                                <InputText id='nome-da-crianca' onChange={(e) => setUser({...user, children_name: e.target.value})}/>
                                <label htmlFor="nome-da-crianca">Nome da criança</label>
                            </FloatLabel>
                            <div className='flex-row'>
                                <p>Gênero: </p>
                                <div className='radio-button'>
                                    <RadioButton inputId='masculino' name='genero' value="masculino" onChange={(e) => setUser({...user, genero: e.value})} checked={user.genero === 'masculino'}/>
                                    <label htmlFor="masculino">Masculino</label>
                                </div>
                                <div className='radio-button'>
                                    <RadioButton inputId='feminina' name='genero' value="feminina" onChange={(e) => setUser({...user, genero: e.value})} checked={user.genero === 'feminina'}/>
                                    <label htmlFor="feminina">Feminina</label>
                                </div>
                            </div>
                        </div>
                        <div className='flex-row'>
                            <FloatLabel>
                                <InputText id="Idade" type='number' onChange={(e) => setUser({...user, idade: e.target.value})}/>
                                <label htmlFor="Idade">Idade</label>
                            </FloatLabel>
                            <FloatLabel>
                                <InputMask id="data_de_nascimento" type='text' onChange={(e) => setUser({...user, data_de_nascimento: e.value})} mask="99/99/9999"/>
                                <label htmlFor="data_de_nascimento">Data de Nascimento</label>
                            </FloatLabel>
                        </div>
                    </>
                )}

                <p>
                    {isRegistering ? (
                        <>
                            Já tem uma conta? <strong style={{cursor: 'pointer'}} onClick={() => setIsRegistering(false)}>Faça login</strong>
                        </>
                    ) : (
                        <>
                            Não tem uma conta? <strong style={{cursor: 'pointer'}} onClick={() => setIsRegistering(true)}>Cadastre-se</strong>
                        </>
                    )}
                </p>

                <Button 
                    label={isRegistering ? 'Cadastrar' : 'Entrar'}
                    className='save-button'
                    onClick={OnSave}
                />
            </div>

            <div className='img-div'>
                <img src={login} alt='criança brincando' />
            </div>
        </section>
        </>
    );
}

export default Login;
