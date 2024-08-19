import './styles/App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home.js';
import Header from './components/header.js'
import { ToastContainer } from 'react-toastify';
import { PrimeReactProvider } from 'primereact/api';
import Atividade from './pages/atividade.js';


function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/atividades/:slug" element={<Atividade />} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;

