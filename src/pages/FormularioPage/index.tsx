import React, { useState } from "react";
import IVersiculo from "../../types/Versiculo";
import Versiculo from "../../components/Versiculo";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import styles from "./styles.module.scss";
import Modal from "@mui/material/Modal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

interface Props {
  addListaAnotacoes: (anotacao: IVersiculo) => void;
}

function FormularioPage({ addListaAnotacoes }: Props) {
  const [sucesso, setSucesso] = useState(false);

  const abrirPopUp = () => setSucesso(true);

  const navigate = useNavigate();

  const irParaHome = () => {
    navigate("/");
  };

  const [texto, setTexto] = useState<IVersiculo>({
    id: "",
    livro: "",
    capitulo: "",
    versiculo: "",
    referencia: "",
    anotacoes: "", // Certifique-se de inicializar as propriedades do objeto IVersiculo
  });

  function enviarTexto(e: React.FormEvent) {
    e.preventDefault();
    abrirPopUp(); // Abra o modal antes de enviar o formulário

    // Defina um temporizador para enviar o formulário após um breve atraso (por exemplo, 1 segundo)
    setTimeout(() => {
      addListaAnotacoes(texto);

      setTexto({
        id: "",
        livro: "",
        capitulo: "",
        versiculo: "",
        referencia: "",
        anotacoes: "",
      });

      
      setSucesso(false);
      irParaHome();
    }, 2000); 
  }

  return (
    <>
      <form onSubmit={enviarTexto} className={styles["form-page"]}>
        <Versiculo setTexto={setTexto} />

        {texto.referencia ? (
          <div className={styles["anotacoes-form"]}>
            <TextField
              id="anotacoes-input"
              multiline
              rows={20}
              required
              label="Anotações"
              variant="outlined"
              value={texto?.anotacoes || ""}
              onChange={(e) => setTexto({ ...texto, anotacoes: e.target.value })}
            />
            
            <Button
              type="submit"
              variant="contained"
              className={styles["botao"]}
              endIcon={<SendIcon />}
            >
              Enviar
            </Button>

            <Modal open={sucesso} onClose={() => irParaHome()} keepMounted>
              <div className={styles["sucesso"]}>
                <CheckCircleOutlineIcon />
                <h3>Anotação criada com sucesso</h3>
              </div>
            </Modal>
          </div>
        ) : (
          ""
        )}
      </form>
    </>
  );
}

export default FormularioPage;
