import React from "react";
import style from "../FilterName/FilterName.module.css";
import { useState, useEffect } from "react";

import useFilterGames from "../../HooksCustom/useFilterGames";
import { Ring } from "@uiball/loaders";

//iconos
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FilterName({
  setError,
  setgames,
  setLoadingFilters,
  loadingFilters,
}) {
  const [searchName, setsearchName] = useState({ name: "" });
  const dbApiSelected = document.getElementsByClassName("dbapi");
  const dbApiArray = Array.from(dbApiSelected);
  //si tengo una opcion seleccionada en el filtro db/api
  const selectDbApi = dbApiArray.find((ele) => ele.selected);
  const genreselected = document.getElementsByClassName("selectedGenre");
  //si tengo una opcion seleccionada en el filtro genres
  const genreArray = Array.from(genreselected);
  const selectGenre = genreArray.find((ele) => ele.selected);

  const [games, loading, error] = useFilterGames(
    searchName,
    selectDbApi,
    selectGenre
  );

  useEffect(() => {
    setgames(games);
    setLoadingFilters(loading);
    setError(error);
  }, [games, loading, error, selectGenre, selectDbApi]);

  const handleSearcheChange = (event) => {
    let target = event.target.name;
    let value = event.target.value;

    setsearchName({
      ...searchName,
      [target]: value,
    });
  };
  return (
    <div className={style.search}>
      <input
        onChange={handleSearcheChange}
        name={"name"}
        type="text"
        placeholder="search"
      />
      {!loadingFilters && (
        <FontAwesomeIcon
          icon={faSearch}
          className={style.searchIcon}
          style={{ color: "white" }}
        />
      )}
      <div id={style.spinner}>
        {loadingFilters && (
          <Ring size={30} lineWeight={5} speed={2} color="white" />
        )}
      </div>
    </div>
  );
}
