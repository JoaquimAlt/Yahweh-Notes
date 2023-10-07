import React from "react";
import IVersiculo from "../../types/Versiculo";
import Card from "../Card";
import styles from "./styles.module.scss"; // Importe as classes SCSS como módulos

interface Props {
    anotacoes: IVersiculo[]
}

function ListaCards({ anotacoes }: Props) {
    return (
        <div className={styles.cards}>
            {anotacoes.map((anotacao) => (
                <div key={anotacao.id} className={styles.card}>
                    <Card anotacao={anotacao} />
                </div>
            ))}
        </div>
    );
}

export default ListaCards;
