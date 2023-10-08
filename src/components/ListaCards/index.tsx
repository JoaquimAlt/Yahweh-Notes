import React, { useState } from "react"; import IVersiculo from "../../types/Versiculo";
import Card from "../Card";
import styles from "./styles.module.scss";
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";

interface Props {
    anotacoes: IVersiculo[]
}

function ListaCards({ anotacoes }: Props) {
    const [filtroLivro, setFiltroLivro] = useState("todos");

    const opcoesLivroUnicas: string[] = [];

    const filtrandoAnotacoes = anotacoes.filter((anotacao) => {
        if (filtroLivro === "todos") {
            return true;
        } else {
            return anotacao.livro === filtroLivro;
        }
    })

    anotacoes.forEach((anotacao) => {
        if (!opcoesLivroUnicas.includes(anotacao.livro)) {
            opcoesLivroUnicas.push(anotacao.livro);
        }
    });

    return (
        <>
            <div className={styles["listagem"]}>
                <div className={styles["filtro-select"]}>
                    <p>Filtrar:</p>
                    <Select size="small" defaultValue="todos" label="Todos" onChange={e => setFiltroLivro(e.target.value)} name="livroFiltro" id="livroFiltro">
                        <MenuItem value="todos" key="todos">Todos</MenuItem>
                        {opcoesLivroUnicas.map((opcao, index) =>
                            <MenuItem value={opcao} key={index}>{opcao}</MenuItem>
                        )}
                    </Select>
                </div>
                <div className={styles["cards"]}>
                    {filtrandoAnotacoes.map((anotacao) => (
                        <div key={anotacao.id} className={styles.card}>
                            <Card anotacao={anotacao} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ListaCards;
