import 'primeicons/primeicons.css';
import Container from 'react-bootstrap/esm/Container';

const QuemSomos = () => {
    return (
        <div className="p-quemsomos">
            <div className="p-text-quemsomos">
                <i className="pi pi-star" style={{ fontSize: '6rem' , padding: "30px"}}></i>
                <h1>Quem somos</h1>
                <p>Somos um grupo de profissionais apaixonados pelo desenvolvimento infantil, comprometidos em oferecer recursos e ferramentas para auxiliar pais e cuidadores no acompanhamento e estimulação de crianças com Transtorno do Espectro Autista (TEA). Nosso aplicativo foi desenvolvido com base em um Protocolo de Estimulação Psicomotora, apresentado no Programa de Pós-Graduação Stricto Sensu em Distúrbios do Desenvolvimento, visando promover o desenvolvimento psicomotor e uma melhor qualidade de vida para as crianças com TEA.
                </p><p>Nossa missão é tornar o processo de estimulação mais acessível, organizado e, acima de tudo, prazeroso tanto para as crianças quanto para os pais. Acreditamos que, com o ambiente adequado e atividades bem direcionadas, o potencial de cada criança pode ser estimulado de forma positiva e significativa.
                </p>
            </div>
        </div>
    );
}

export default QuemSomos;