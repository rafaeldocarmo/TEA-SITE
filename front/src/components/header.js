import '../styles/main.scss'
import React, { useRef, useState } from 'react'
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { BreadCrumb } from 'primereact/breadcrumb';


const Header = (props) => {
  const menuRight = useRef(null);
  const [isLogged, setIsLogged] = useState(true)
  const items = [
    {
        label: 'Home',
        url: '/'
    },
    {
      label: 'Quem Somos',
      url: '/'
    },
    {
        label: 'Login',
        url: '/login'
    },
  ];
  return (
    <>
      <header>
          <Container className='header-content header-desktop'>
            <h1>TEA</h1>
            <div>
              <Link className='header-item' to="/">Home</Link>
              <Link className='header-item' to="/">Quem Somos</Link>
              {isLogged ? <Link className='header-item' to="/perfil">Perfil</Link> : <Link className='header-item' to="/login">Login</Link>}
            </div>
          </Container>
          <Container className='header-content header-mobile'>
            <h1>TEA</h1>
            <Menu model={items} popup ref={menuRight} id="popup_menu_right" className='menu-hamb' />
            <Button icon="pi pi-bars" className="mr-2" unstyled onClick={(event) => menuRight.current.toggle(event)} />
          </Container>
      </header>
    </>
  )
}

export default Header
