import '../styles/App.scss'
import React from 'react'
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
        <Container className='header-content'>
        <h1>TEA</h1>
        <div>
            <Link className='footer-item' to="/">Contato: TEA@gmail.com</Link>
        </div>
        </Container>
    </footer>
  )
}

export default Footer
