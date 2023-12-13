import style from "./Footer.module.css";
import React from "react";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <footer className={style.container}>
      <div className={style.icons}>
        <a href="https://github.com/EdwardRaga" target="_blank">
          <FontAwesomeIcon
            className={style.icon}
            id={style.github}
            icon={faGithub}
          />
        </a>
        <a href="https://www.linkedin.com/in/edwardraga/" target="_blank">
          <FontAwesomeIcon
            className={style.icon}
            id={style.linkedin}
            icon={faLinkedin}
          />
        </a>
      </div>
      <div>
        <p>
          e-mail:{" "}
          <a href="mailto:edwardraga@icloud.com" id={style.email}>
            edwardraga@icloud.com
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
