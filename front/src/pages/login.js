import '../styles/login.scss';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import loginIMg from '../images/login.png';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authProvider';
import Container from 'react-bootstrap/Container';
import Input from '../components/input';
        

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
                toast.current.show({severity:'success', summary: 'Sucesso', detail:'Usuário logado', life: 3000});
                const result = await response.json();
                login(result.token);
                navigate('/')
                
            } else {
                toast.current.show({severity:'error', summary: 'Erro', detail:'Erro ao realizar login', life: 3000});

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

                    {!isRegistering ? (
                        <>
                            <h1>Login</h1>

                            <div className='flex-row'>
                                <Input type='text' name='Email' onChange={(e) => setUser({ ...user, email: e.target.value })} label="Email" />
                            </div>
                            <div className='flex-row'>
                                <FloatLabel>
                                    <Password id='password' value={user.senha} onChange={(e) => setUser({ ...user, senha: e.target.value })} toggleMask feedback={false}/>
                                    <label htmlFor="password">Senha</label>
                                </FloatLabel>
                            </div>
                            <div className='flex-row'>
                                <p>
                                    Não tem uma conta? <strong style={{ cursor: 'pointer' }} onClick={() => setIsRegistering(true)}>Cadastre-se</strong>
                                </p>
                            </div>
                            <div className='flex-row'>
                                <Button
                                    label='Entrar'
                                    className='save-button'
                                    onClick={() => handleLogin()}
                                />
                            </div>
                        </>
                    ) : (
                        <Cadastro user={user} setUser={setUser} setIsRegistering={setIsRegistering} toast={toast}/>
                    )}
                    
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

const Cadastro = ({ user, setUser, setIsRegistering, toast }) => { 
    const [isFormValid, setIsFormValid] = useState(false);
    const [hasEspeciality, setHasEspeciality] = useState(false);

    useEffect(() => {
        const areFieldsFilled = Object.values(user).every(value => value?.trim() !== '');

        const arePasswordsEqual = user.senha === user.confirmarSenha;

        setIsFormValid(areFieldsFilled && arePasswordsEqual);
        
        user.user_type_id === "1" ? setHasEspeciality(true) : setHasEspeciality(false)
    }, [user]);

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
                toast.current.show({severity:'success', summary: 'Sucesso', detail:'Usuário cadastrado', life: 3000});
                setIsRegistering(false)
            } else {
                toast.current.show({severity:'error', summary: 'Erro', detail:'Usuário não cadastrado', life: 3000});
            }
        } catch (error) {
        }
    };

    return (
        <>  
            <h1>Cadastre-se</h1>

            <div className='flex-row'>
                <div className='radios-background'>
                    <p>Usuário: </p>
                    <div className='radio-button'>
                        <RadioButton inputId='terapeuta' name='user_type' value="1" onChange={(e) => setUser({ ...user, user_type_id: e.value })} checked={user?.user_type === 'terapeuta'} />
                        <label htmlFor="terapeuta">Terapeuta</label>
                    </div>
                    <div className='radio-button'>
                        <RadioButton inputId='pais' name='user_type' value="2" onChange={(e) => setUser({ ...user, user_type_id: e.value })} checked={user?.user_type === 'pais'} />
                        <label htmlFor="pais">Pai/Mãe</label>
                    </div>
                    <div className='radio-button'>
                        <RadioButton inputId='cuidador' name='user_type' value="3" onChange={(e) => setUser({ ...user, user_type_id: e.value })} checked={user?.user_type === 'cuidador'} />
                        <label htmlFor="cuidador">Outro cuidador</label>
                    </div>
                </div>
            </div>
            {hasEspeciality && (
                <div className='flex-row'>
                    <Input type='text' name='Especialidade' onChange={(e) => setUser({ ...user, especialidade: e.target.value })} label="Especialidade" />
                </div>
            )} 
            <div className='flex-row'>
                <Input type='text' name='responsible-name' onChange={(e) => setUser({ ...user, name: e.target.value })} label="Nome do Responsável" />
                <Input type='text' name='nome-da-crianca' onChange={(e) => setUser({ ...user, child_name: e.target.value })} label="Nome da criança" />
            </div>
            <div className='flex-row'>
                <Input type='mask' name='data_de_nascimento' onChange={(e) => setUser({ ...user, child_birthdate: e.target.value })} label="Data de nascimento" mask="99/99/9999" />                          
                <Input type='mask' name='tel' onChange={(e) => setUser({ ...user, phone: e.target.value })} label="Telefone" mask="(99)99999-9999" />                          
            </div>
            <div className='flex-row'>
                <div className='radios-background'>
                    <p>Gênero: </p>
                    <div className='radio-button'>
                        <RadioButton inputId='masculino' name='genero' value="M" onChange={(e) => setUser({ ...user, child_gender: e.value })} checked={user?.genero === 'masculino'} />
                        <label htmlFor="masculino">Masculino</label>
                    </div>
                    <div className='radio-button'>
                        <RadioButton inputId='feminina' name='genero' value="F" onChange={(e) => setUser({ ...user, child_gender: e.value })} checked={user?.genero === 'feminina'} />
                        <label htmlFor="feminina">Feminina</label>
                    </div>
                </div>
            </div>
            <div className='flex-row'>
                <Input type='text' name='Email' onChange={(e) => setUser({ ...user, email: e.target.value })} label="Email" />
                <Input type='mask' name='cpf' onChange={(e) => setUser({ ...user, cpf: e.target.value })} label="CPF" mask="999.999.999-99" />
            </div>
            <div className='flex-row'>
                <FloatLabel>
                    <Password id='password' onChange={(e) => setUser({ ...user, senha: e.target.value })} toggleMask/>
                    <label htmlFor="password">Senha</label>
                </FloatLabel>
                <FloatLabel>
                    <Password id='password' onChange={(e) => setUser({ ...user, confirmarSenha: e.target.value })} toggleMask feedback={false}/>
                    <label htmlFor="password">Confirmar Senha</label>
                </FloatLabel>
            </div>
            <div className='flex-row'>
                <p>
                    Já tem uma conta? <strong style={{ cursor: 'pointer' }} onClick={() => setIsRegistering(false)}>Faça login</strong>
                </p>
            </div>
            <div className='flex-row'>
                <Button
                    label={'Cadastrar'}
                    className='save-button'
                    onClick={OnSave}
                    disabled={!isFormValid}
                />
            </div>
        </>
    )
}

export default Login;
