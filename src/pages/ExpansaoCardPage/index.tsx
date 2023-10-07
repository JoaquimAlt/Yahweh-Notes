import { Link, useParams } from 'react-router-dom';
import IVersiculo from '../../types/Versiculo';
import styles from "./styles.module.scss";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidarModal from '../../components/ValidarModal';

interface Props {
  anotacoes: IVersiculo[],
  setAnotacoes: React.Dispatch<React.SetStateAction<IVersiculo[]>>
}

function ExpansaoCardPage({ anotacoes, setAnotacoes }: Props) {

  const [validarDelete, setValidarDelete] = useState(false);

  const abrirPerguntaDelete = (af: boolean) => setValidarDelete(af);

  const [validarEdicao, setValidarEdicao] = useState(false);

  const abrirPerguntaEdicao = (af: boolean) => setValidarEdicao(af);

  const { id } = useParams();

  function excluirAnotacao(id: string) {
    const novaAnotacoes = anotacoes.filter((anotacao) => anotacao.id !== id);
    setAnotacoes(novaAnotacoes);
    localStorage.setItem('anotacoes', JSON.stringify(novaAnotacoes));
  }

  const navigate = useNavigate();
  const irParaHome = () => {
    navigate("/");
  };

  

  const cardSelecionado = anotacoes.find((anotacao) => anotacao.id === id);

  if (!cardSelecionado) {
    return <div>Card não encontrado.</div>;
  };
  
  const irEditarAnotacao = (id: string) => {
    if (cardSelecionado !== undefined){
    navigate(`/form/${id}`)
    }
  }

  return (
    <>
      <Link to="/">
        <div className={styles["botao-home"]}>
          <ArrowBackIosNewIcon />
        </div>
      </Link>
      <div className={styles["detalhes-card"]}>
        <div className={styles["referencia"]}>
          <strong>"</strong>
          <div className={styles["box"]}>
            <h4>{cardSelecionado.referencia}</h4>
            <h2>{cardSelecionado.livro} {cardSelecionado.capitulo}:{cardSelecionado.versiculo}</h2>
          </div>
          <strong>"</strong>
        </div>

        <p>{cardSelecionado.anotacoes}</p>

      </div>
      <div className={styles["botoes-container"]}>
        <Button
          variant="outlined"
          onClick={() => abrirPerguntaDelete(true)}
          color="warning"
        >
          <DeleteIcon />
        </Button>

        <Button
          variant="outlined"
          onClick={() => abrirPerguntaEdicao(true)}
        >
          <ModeEditIcon />
        </Button>
      </div>

      <ValidarModal
        color="warning"
        texto="Deseja mesmo deletar anotação?"
        irPraHome={irParaHome}
        funcaoPrincipal={excluirAnotacao}
        icone={<DeleteIcon />}
        estadoModal={validarDelete}
        abrirOUfechar={abrirPerguntaDelete}
        idAnotacao={cardSelecionado.id}
      />

      <ValidarModal
        color="primary"
        texto="Deseja mesmo editar anotação?"
        funcaoPrincipal={irEditarAnotacao}
        icone={<ModeEditIcon />}
        estadoModal={validarEdicao}
        abrirOUfechar={abrirPerguntaEdicao}
        idAnotacao={cardSelecionado.id}
      />

    </>
  );
}

export default ExpansaoCardPage;