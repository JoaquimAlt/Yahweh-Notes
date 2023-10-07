import { TextField } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IVersiculo from "../../types/Versiculo";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import styles from "./styles.module.scss";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface Props {
  setTexto: React.Dispatch<React.SetStateAction<IVersiculo>>
}

function Versiculo({ setTexto }: Props) {
  const [livro, setLivro] = useState("");
  const [capitulo, setCapitulo] = useState("");
  const [versiculo, setVersiculo] = useState("");
  const [referencia, setReferencia] = useState("");
  const [livroFormatado, setLivroFormatado] = useState("");

  const [mostrarErro, setMostrarErro] = useState(false);

  if (mostrarErro === true){
    setTimeout(() => {
      setMostrarErro(false);
    }, 7000);
  }

  const pegarTexto = async () => {
    if (livro !== "" && capitulo !== "" && versiculo !== "") {
      try {
        const consultaTexto = await axios.get(`https://www.abibliadigital.com.br/api/verses/nvi/${livro}/${capitulo}/${versiculo}`)

        if (consultaTexto.data.erro) {
          throw new Error('Versiculo Inexistente')
        }

        // Defina 'referencia' com o texto da API dentro deste bloco
        const formataTexto = consultaTexto.data;
        setLivroFormatado(formataTexto.book.name);
        setReferencia(formataTexto.text);
      } catch (error) {
        setLivro("");
        setCapitulo("")
        setReferencia("")
        setVersiculo("")

        setMostrarErro(true);

        console.error('Erro ao processar a solicitação:', error);
      }
    }
  };

  function adicionarVersiculo() {
    const novoVersiculo: IVersiculo = {
      id: uuidv4(),
      livro: livroFormatado,
      capitulo,
      versiculo,
      referencia
    };

    setLivroFormatado("");
    setTexto(novoVersiculo);
  }

  return (
    <>
      <div className={styles["form-versiculo"]}>
        <TextField
          required
          label="Livro"
          id="livro"
          variant="outlined"
          value={livro}
          onChange={(e) => {setLivro(e.target.value); setMostrarErro(false)}}
          onBlur={pegarTexto}
          error={mostrarErro}
        />
        <TextField
          required
          label="Capitulo"
          id="capitulo"
          variant="outlined"
          value={capitulo}
          onChange={(e) => {setCapitulo(e.target.value); setMostrarErro(false)}}
          onBlur={pegarTexto}
          error={mostrarErro}
        />

        <TextField
          required
          label="Versiculo"
          id="versiculo"
          variant="outlined"
          value={versiculo}
          onChange={(e) => {setVersiculo(e.target.value); setMostrarErro(false)}}
          onBlur={pegarTexto}
          error={mostrarErro}
        />

        {mostrarErro && <div className={styles["mensagem-erro"]}><h4>Digite uma referência valida</h4><HighlightOffIcon/></div>}

        <div className={styles["referencia"]}>
          {referencia ? <div><p><strong>" </strong>{referencia}<strong> "</strong></p></div> : <p>A prévia aparecerá aqui</p>}
        </div>

        <div className={styles["botoes"]}>
          {referencia
            ?
            <>
              <Button color="success" onClick={adicionarVersiculo} variant="contained" endIcon={<AddCircleOutlineIcon />}>
                Confirmar Versiculo
              </Button>
            </>
            :
            <Button disabled onClick={adicionarVersiculo} variant="contained" endIcon={<AddCircleOutlineIcon />}>
              Confirmar Versiculo
            </Button>
          }
          <Link to="/">
            <Button color="error" variant="contained" startIcon={<ArrowBackIcon />}>
              Cancelar Anotação
            </Button>
          </Link>
        </div>

      </div>
    </>
  );
}

export default Versiculo;
