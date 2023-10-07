import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IVersiculo from "../../types/Versiculo";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import styles from "./styles.module.scss";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from "react-router-dom";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { livro_para_abreviacao } from "../../types/Abreviacoes";

interface Props {
  setTexto: React.Dispatch<React.SetStateAction<IVersiculo>>,
  anotacoes: IVersiculo[] | undefined
}

function Versiculo({ setTexto, anotacoes }: Props) {
  const [livro, setLivro] = useState("");
  const [capitulo, setCapitulo] = useState("");
  const [versiculo, setVersiculo] = useState("");
  const [referencia, setReferencia] = useState("");
  const [livroFormatado, setLivroFormatado] = useState("");

  const { id } = useParams();

  const [mostrarErro, setMostrarErro] = useState(false);

  if (mostrarErro === true) {
    setTimeout(() => {
      setMostrarErro(false);
    }, 7000);
  }

  const [livroOuAbreviacao, setLivroOuAbreviacao] = useState("");

  const pegarTexto = async () => {
    if (livro !== "" && capitulo !== "" && versiculo !== "") {
      try {
        const consultaTexto = await axios.get(`https://www.abibliadigital.com.br/api/verses/nvi/${livroOuAbreviacao}/${capitulo}/${versiculo}`)

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
  };

  useEffect(() => {
    if (livro.length > 3) {
      setLivroOuAbreviacao(livro_para_abreviacao(livro).toLowerCase());
    } else {
      setLivroOuAbreviacao(livro.toLowerCase());
    }
  }, [livro]);

  useEffect(() => {
    if (id && anotacoes) {
      const anotacaoPraEditar = anotacoes.find((anotacao) => anotacao.id === id);

      if (anotacaoPraEditar) {
        setLivro(anotacaoPraEditar.livro);
        setLivroFormatado(anotacaoPraEditar.livro)
        setCapitulo(anotacaoPraEditar.capitulo);
        setVersiculo(anotacaoPraEditar.versiculo);
        setReferencia(anotacaoPraEditar.referencia);
      }
    }
  }, [id, anotacoes]);

  return (
    <>
      <div className={styles["form-versiculo"]}>
        <TextField
          required
          helperText="Digite o livro ou abreviação do livro. Ex:(Gênesis ou Gn, Mateus ou Mt)"
          label="Livro"
          id="livro"
          variant="outlined"
          value={livro}
          onChange={(e) => { setLivro(e.target.value); setMostrarErro(false) }}
          onBlur={pegarTexto}
          error={mostrarErro}
        />
        <TextField
          required
          helperText="Digite o capítulo onde está a referência"
          label="Capitulo"
          id="capitulo"
          variant="outlined"
          value={capitulo}
          onChange={(e) => { setCapitulo(e.target.value); setMostrarErro(false) }}
          onBlur={pegarTexto}
          error={mostrarErro}
          type="number"
        />

        <TextField
          required
          helperText="Digite o versículo onde está a referência"
          label="Versiculo"
          id="versiculo"
          variant="outlined"
          value={versiculo}
          onChange={(e) => { setVersiculo(e.target.value); setMostrarErro(false) }}
          onBlur={pegarTexto}
          error={mostrarErro}
          type="number"
        />

        {mostrarErro && <div className={styles["mensagem-erro"]}><h4>Digite uma referência valida</h4><HighlightOffIcon /></div>}

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
