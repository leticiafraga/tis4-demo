import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import style from "./header.module.scss";

export default function Header() {
  const username = localStorage.getItem("USERNAME");
  const auth = useAuth();
  function logout() {
    auth.logout();
  }
  return (
    <div className={style.header}>
      <header>
        <span>Gerenciamento de atletas</span>
        <div>
          <span>Olá, {username}</span>
          <span className={"ms-3 " + style.sair}>
            <span onClick={logout}>Sair</span>
          </span>
        </div>
      </header>
      <nav className="navbar navbar-expand-md ps-2">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ps-2" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to={""}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/create"}>
                Cadastro de atletas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/list"}>
                Lista de atletas
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
