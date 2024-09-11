import '../styles/login.scss';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from "primereact/floatlabel";
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import loginIMg from '../images/login.png';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authProvider';
import Container from 'react-bootstrap/Container';
        

const Login = () => {

    const [user, setUser] = useState({user_type_id: null, name: '', email: '', phone: null, child_name: '', child_gender: '', child_birthdate: null, senha: null});
    const [isRegistering, setIsRegistering] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate()
    const { isAuthenticated, login, getUser } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const OnSave = async () => {
        try {
            const response = await fetch('http://localhost:8800/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
              });
            if (response.ok) {
            } else {
                console.error('Erro ao enviar cronograma:', response.status);
            }
        } catch (error) {
            console.error('Erro ao enviar cronograma:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8800/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email, senha: user.senha }),
            });
    
            if (response.ok) {
                const result = await response.json();
                login(result.token);
                navigate('/')
                
            } else {
                const errorResult = await response.json();
                console.error('Erro ao realizar login:', errorResult.message);
            }
        } catch (error) {
            console.error('Erro ao enviar dados para o backend:', error);
        }
    };

    const items = [{ label: !isRegistering ? 'Login' : 'Cadastro', url: `/login` }];
    const home = { icon: 'pi pi-home', url: '/' }


    return (
        <Container>
            <Toast ref={toast} />
            <BreadCrumb home={home} model={items} />
            <section className='user-form'>
                <div className='form-login'>
                    <h1>{isRegistering ? 'Cadastre-se' : 'Login'}</h1>

                    {!isRegistering ? (
                        <>
                            <div className='flex-row'>
                                <FloatLabel>
                                    <InputText id="Email" type='email' onChange={(e) => setUser({ ...user, email: e.target.value })} />
                                    <label htmlFor="Email">Email</label>
                                </FloatLabel>
                            </div>
                            <div className='flex-row'>
                                <FloatLabel>
                                    <Password id='password' value={user.senha} onChange={(e) => setUser({ ...user, senha: e.target.value })} toggleMask feedback={false}/>
                                    <label htmlFor="password">Senha</label>
                                </FloatLabel>
                            </div>
                        </>
                    ) : (
                        <>  
                            <div className='flex-row'>
                                <div className='radios-background'>
                                    <p>Usuário: </p>
                                    <div className='radio-button'>
                                        <RadioButton inputId='terapeuta' name='user_type' value="1" onChange={(e) => setUser({ ...user, user_type_id: e.value })} checked={user.user_type === 'terapeuta'} />
                                        <label htmlFor="terapeuta">Terapeuta</label>
                                    </div>
                                    <div className='radio-button'>
                                        <RadioButton inputId='pais' name='user_type' value="2" onChange={(e) => setUser({ ...user, user_type_id: e.value })} checked={user.user_type === 'pais'} />
                                        <label htmlFor="pais">Pai/Mãe</label>
                                    </div>
                                    <div className='radio-button'>
                                        <RadioButton inputId='cuidador' name='user_type' value="3" onChange={(e) => setUser({ ...user, user_type_id: e.value })} checked={user.user_type === 'cuidador'} />
                                        <label htmlFor="cuidador">Outro cuidador</label>
                                    </div>
                                </div>
                            </div>
                            <div className='flex-row'>
                                <FloatLabel>
                                    <InputText id='responsible-name' onChange={(e) => setUser({ ...user, name: e.target.value })} />
                                    <label htmlFor="responsible-name">Nome do Responsável</label>
                                </FloatLabel>
                                <FloatLabel>
                                    <InputText id='nome-da-crianca' onChange={(e) => setUser({ ...user, child_name: e.target.value })} />
                                    <label htmlFor="nome-da-crianca">Nome da criança</label>
                                </FloatLabel>
                            </div>
                            <div className='flex-row'>
                                <FloatLabel>
                                    <InputMask id="data_de_nascimento" type='text' onChange={(e) => setUser({ ...user, child_birthdate: e.value })} mask="99/99/9999" />
                                    <label htmlFor="data_de_nascimento">Data de Nascimento</label>
                                </FloatLabel>                             
                                <FloatLabel>
                                    <InputMask id="tel" type='tel' onChange={(e) => setUser({ ...user, phone: e.value })} mask="(99)99999-9999" />
                                    <label htmlFor="tel">Telefone</label>
                                </FloatLabel>
                            </div>
                            <div className='flex-row'>
                                <div className='radios-background'>
                                    <p>Gênero: </p>
                                    <div className='radio-button'>
                                        <RadioButton inputId='masculino' name='genero' value="M" onChange={(e) => setUser({ ...user, child_gender: e.value })} checked={user.genero === 'masculino'} />
                                        <label htmlFor="masculino">Masculino</label>
                                    </div>
                                    <div className='radio-button'>
                                        <RadioButton inputId='feminina' name='genero' value="F" onChange={(e) => setUser({ ...user, child_gender: e.value })} checked={user.genero === 'feminina'} />
                                        <label htmlFor="feminina">Feminina</label>
                                    </div>
                                </div>
                            </div>
                            <div className='flex-row'>
                                <FloatLabel>
                                    <InputText id="Email" type='email' onChange={(e) => setUser({ ...user, email: e.target.value })} />
                                    <label htmlFor="Email">Email</label>
                                </FloatLabel>
                                <FloatLabel>
                                    <Password id='password' value={user.senha} onChange={(e) => setUser({ ...user, senha: e.target.value })} toggleMask/>
                                    <label htmlFor="password">Senha</label>
                                </FloatLabel>
                            </div>
                        </>
                    )}
                    <div className='flex-row'>
                        <p>
                            {isRegistering ? (
                                <>
                                    Já tem uma conta? <strong style={{ cursor: 'pointer' }} onClick={() => setIsRegistering(false)}>Faça login</strong>
                                </>
                            ) : (
                                <>
                                    Não tem uma conta? <strong style={{ cursor: 'pointer' }} onClick={() => setIsRegistering(true)}>Cadastre-se</strong>
                                </>
                            )}
                        </p>
                    </div>
                    <div className='flex-row'>
                        <Button
                            label={isRegistering ? 'Cadastrar' : 'Entrar'}
                            className='save-button'
                            onClick={isRegistering ? OnSave : handleLogin}
                        />
                    </div>
                </div>
                <div className='flex-row'>
                    <div className='img-div'>
                        <img src={loginIMg} alt='criança brincando' />
                    </div>
                </div>
            </section>
        </Container>
    );
}

export default Login;
