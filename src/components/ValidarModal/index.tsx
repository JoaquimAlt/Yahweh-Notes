import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  texto: string,
  color: "warning" | "primary" | "inherit" | "secondary" | "success" | "error" | "info",
  funcaoPrincipal: (id: string) => void,
  irPraHome?: () => void,
  estadoModal: boolean,
  icone: ReactNode
  abrirOUfechar: (af: boolean) => void,
  idAnotacao: string
}

export default function ValidarModal(
  { texto, color, idAnotacao, abrirOUfechar, estadoModal, funcaoPrincipal, irPraHome, icone }: Props) {
  return (
    <Modal
      open={estadoModal}
      onClose={() => abrirOUfechar(false)}
      keepMounted
    >
      <div className={styles["validar-modal"]}>
        <h4>{texto}</h4>
        <Button
          variant="contained"
          color={color}
          onClick={() => {
            funcaoPrincipal(idAnotacao);
            if (irPraHome) {
              irPraHome();
            }
          }
          }
        >
          {icone}
        </Button>
      </div>
    </Modal>
  );
} 