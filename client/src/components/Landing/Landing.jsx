import React from "react";
import style from "./Landing.module.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className={style.container}>
      <Link to={"/home"}>
        <button>Begin your adventure now!</button>
      </Link>
      <p>Discover everything you need to know about the most popular games!</p>
    </div>
  );
}

export default Landing;
