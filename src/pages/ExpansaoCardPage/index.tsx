import { Link, useParams } from 'react-router-dom';
import IVersiculo from '../../types/Versiculo';
import styles from "./styles.module.scss";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";

interface Props {
  anotacoes: IVersiculo[],
  setAnotacoes: React.Dispatch<React.SetStateAction<IVersiculo[]>>
}

function ExpansaoCardPage({ anotacoes, setAnotacoes }: Props) {

  const [validarDelete, setvalidarDelete] = useState(false);

  const abrirPerguntaDelete = (af: boolean) => setvalidarDelete(af);

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
        >
          <ModeEditIcon />
        </Button>
      </div>

      <Modal
        open={validarDelete}
        onClose={() => abrirPerguntaDelete(false)}
        keepMounted
      >
        <div className={styles["validar-delete"]}>
          <h4>Deseja mesmo deletar anotação?</h4>
          <Button
            variant="contained"
            color="warning"
            onClick={() => { excluirAnotacao(cardSelecionado.id);  irParaHome()}}
          >
            <DeleteIcon />
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ExpansaoCardPage;