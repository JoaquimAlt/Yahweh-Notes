import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss"; // Importe as classes SCSS como módulos

function NavBar() {
  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <div>
          <Link to="/" className={styles["navbar-logo"]}>
            YAHWEH-NOTES
          </Link>
        </div>
        <Link to="/form">
          <div className={styles["botao-nav-form"]}>
            ADICIONAR ANOTAÇÃO
          </div>
        </Link>
      </div>
    </header>
  );
}

export default NavBar;
