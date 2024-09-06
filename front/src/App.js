import './styles/App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home.js';
import Header from './components/header.js'
import { ToastContainer } from 'react-toastify';
import { PrimeReactProvider } from 'primereact/api';
import Atividade from './pages/atividade.js';
import Login from './pages/login.js';
import Footer from './components/footer.js';
import Perfil from './pages/perfil.js';


function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/atividades/:slug" element={<Atividade />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;

