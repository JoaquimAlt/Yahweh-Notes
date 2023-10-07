import React from "react";
import { Link } from "react-router-dom";
import IVersiculo from "../../types/Versiculo";
import styles from "./styles.module.scss"; // Importe as classes SCSS como módulos

interface Props {
    anotacao: IVersiculo
}

function Card({ anotacao }: Props) {
    const limitarTexto = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
          return text; // Não precisa de truncamento
        }
        return text.slice(0, maxLength) + "..."; // Truncar e adicionar reticências
    };

    return (
        <div className={styles.cardVersiculos}>
            <div className={styles["box-1"]}>
                <h4>"{anotacao.referencia}"</h4>
            </div>
            <h3 className={styles.livro}>{anotacao.livro}</h3>
            <div className={styles["box-2"]}>
                <strong>{anotacao.capitulo}:{anotacao.versiculo}</strong>
                <p>
                    {anotacao.anotacoes !== undefined && anotacao.referencia.length < 100
                        ? limitarTexto(anotacao.anotacoes, 120)
                        : anotacao.anotacoes !== undefined ? limitarTexto(anotacao.anotacoes, 40) : ''}
                </p>
            </div>
            <Link to={`detalhes/${anotacao.id}`} className={styles["button-card"]}>Ler mais</Link>
        </div>
    );
}

export default Card;
