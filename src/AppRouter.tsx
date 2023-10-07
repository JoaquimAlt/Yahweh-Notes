import React, { useEffect, useState } from 'react';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import IVersiculo from './types/Versiculo';
import FormularioPage from './pages/FormularioPage';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import ExpansaoCardPage from './pages/ExpansaoCardPage';

function Rotas() {
  const [anotacoes, setAnotacoes] = useState<IVersiculo[]>([])

  // Função para adicionar anotações
  function addListaAnotacoes(anotacao: IVersiculo) {
    setAnotacoes((anotacoesAntigas) => [...anotacoesAntigas, anotacao]);
    localStorage.setItem('anotacoes', JSON.stringify([...anotacoes, anotacao]));
  }

  useEffect(() => {
    // Carregue as anotações salvas no localStorage ao montar o componente
    const anotacoesSalvas = localStorage.getItem('anotacoes');
    if (anotacoesSalvas) {
      setAnotacoes(JSON.parse(anotacoesSalvas));
    }
  }, []);

  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
        <Route
           path="/form"
           element={<FormularioPage addListaAnotacoes={addListaAnotacoes} />}
        />
        <Route
           path="/"
           element={<HomePage  anotacoes={anotacoes}/>}
        />
        <Route
          path="/detalhes/:id" // Rota para a página de detalhes com o ID como parâmetro
          element={<ExpansaoCardPage setAnotacoes={setAnotacoes} anotacoes={anotacoes} />}
        />
    </Routes>
    </BrowserRouter>
  );
}

export default Rotas;