import { Link } from "react-router-dom";
import ListaCards from "../../components/ListaCards";
import IVersiculo from "../../types/Versiculo";
import styles from "./styles.module.scss";
import {ReactComponent as ImagemSemAnotacao} from "../../assets/images/sem-anotacao.svg"

interface Props {
    anotacoes: IVersiculo[],
}

function HomePage({ anotacoes }: Props) {
    return (
        <div >
            {anotacoes.length === 0
                ?
                <div className={styles["sem-cards"]}>
                    <ImagemSemAnotacao/>
                    <h3>Você ainda não fez nenhuma anotação</h3>
                    <Link to="/form">
                        <button className={styles["botao"]}>
                            ADICIONAR ANOTAÇÃO
                        </button>
                    </Link>
                </div>
                :
                <ListaCards anotacoes={anotacoes} />
            }

        </div>
    );
}

export default HomePage;