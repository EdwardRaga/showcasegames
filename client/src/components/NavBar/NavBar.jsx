import styles from "./NavBar.module.css";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { faGamepad, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to={"/home"}>
          <h1>PlayNation</h1>
        </Link>
      </div>
      <div className={styles.links}>
        <ul>
          <li>
            <NavLink to={"/home"} activeClassName={styles.active}>
              <FontAwesomeIcon icon={faHome} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/addgame"} activeClassName={styles.active}>
              <FontAwesomeIcon icon={faGamepad} /> Add game
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
