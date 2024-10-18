import '../styles/main.scss'
import React, { useEffect, useRef, useContext } from 'react'
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { HashLink } from 'react-router-hash-link';
import { AuthContext } from '../context/authProvider';

const Header = (props) => {
  const menuRight = useRef(null);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate()
  const items = [
    {
        label: 'Home',
        command: () => navigate('/')
    },
    {
        label: 'Quem Somos',
        command: () => navigate('/#quemsomos')
    },
    ...(isAuthenticated ? 
    [{
      label: 'Perfil',
      command: () => navigate('/perfil')
    }] : 
    [{
      label: 'Login',
      command: () => navigate('/login')
    }])
  ];

  return (
    <>
      <header>
          <Container className='header-content header-desktop'>
            <h1>ESTIMULA TEA</h1>
            <div>
              <Link className='header-item' to="/">Home</Link>
              <HashLink to="/#quemsomos" className='header-item' scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'center' })}>Quem Somos</HashLink>
              <Link className='header-item' to="/contato">Contato</Link>
              {isAuthenticated ? <Link className='header-item' to="/perfil">Perfil</Link> : <Link className='header-item' to="/login">Login</Link>}
            </div>
          </Container>
          <Container className='header-content header-mobile'>
            <h1>Estimula TEA</h1>
            <Menu model={items} popup ref={menuRight} id="popup_menu_right" className='menu-hamb' />
            <Button icon="pi pi-bars" className="mr-2" unstyled onClick={(event) => menuRight.current.toggle(event)} />
          </Container>
      </header>
    </>
  )
}

export default Header
