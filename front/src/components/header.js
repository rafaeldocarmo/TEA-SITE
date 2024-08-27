import '../styles/App.scss'
import React from 'react'
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';


const Header = (props) => {

  return (
    <>
      <header>
          <Container className='header-content'>
            <h1>TEA</h1>
            <div>
              <Link className='header-item' to="/">Home</Link>
              <Link className='header-item' to="/">Quem Somos</Link>
              <Link className='header-item' to="/login">Login</Link>
            </div>
          </Container>
      </header>
      {/* <header className='menu-hamburguer'>
        {!openMenu && (<div className='menu-hamburguer-button' onClick={() => {setOpenMenu(true)}}></div>)}
        {openMenu && (<div className='menu-hamburguer-button-close' onClick={() => {setOpenMenu(false)}}></div>)}
        <Container className={openMenu ? 'menu-hamburguer-content menu-open' : 'menu-hamburguer-content '}>
            {!isHome && (
              <>
              <Link className='header-item' to="/" onClick={() => {setOpenMenu(false)}}>
                Home
              </Link>
              </>
            )}
            <Link className='header-item' to="/filmes" onClick={() => {setOpenMenu(false)}}>Filmes</Link>
            <Link className='header-item' to="/series" onClick={() => {setOpenMenu(false)}}>Séries</Link>
            <Link className='header-item' to="/livros" onClick={() => {setOpenMenu(false)}}>Livros</Link>
            <Link className='header-item' to="/avaliacoes" onClick={() => {setOpenMenu(false)}}>Avaliações</Link>
            <Link className='header-item' to="/membros" onClick={() => {setOpenMenu(false)}}>Membros</Link>
            {!(userLoggedIn || adminLoggedIn) && (<>
              <h4 onClick={() => {setOpenMenu(false); props.clickLogin()}}>Login</h4>
            </>)}
            {(userLoggedIn) && (<>
              <Link className='header-item' to={'/usuario/' + userLoggedIn} onClick={() => {setOpenMenu(false)}}>Perfil</Link>
            </>)}
            {(adminLoggedIn) && (<>
              <Link className='header-item' to={'/usuario/' + adminLoggedIn} onClick={() => {setOpenMenu(false)}}>Perfil</Link>
            </>)}
            {(userLoggedIn || adminLoggedIn) && (<>
              <Link className='header-item' onClick={handleGetOut} >Sair</Link>
            </>)}
          </Container>
      </header> */}
    </>
  )
}

export default Header
