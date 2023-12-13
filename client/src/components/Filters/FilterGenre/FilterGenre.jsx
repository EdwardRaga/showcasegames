import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getGenres, filters } from "../../../redux/action/action";
import filter from "./filter";
import filterdbApi from "../FilterdbApi/FilterdbApi";

const FilterGenre = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  // ¡¡¡ESCUCHA CAMBIOS EN LA BARRA DE BUSQUEDA!!!
  // escucha al estado global que cambia al buscar un juego por nombre
  // si está seleccionado un género la información de los juegos buscados se filtrará deacuerdo al género selected

  //manjador de cambios en el select por géneros
  const handleSelect = (event) => {
    const genre = event.target.value;

    //detectar si el select de api/db tiene un option en selected.

    const genreselected2 = document.getElementsByClassName("dbapi");
    const genreArray2 = Array.from(genreselected2);
    const select = genreArray2.find((ele) => ele.selected);

    //si tiene un db/api selected verificar si el opción seleccionada es diferente a allgenres en el select de géneros.
    // es decir que tiene seleccionado un género en especifico y no allgenres.
    if (select) {
      if (genre !== "allgenres") {
        //juegos que pertenecen a un genero filter se encarga de filtrar por ese género selected
        const genres = filter(state.copygames, genre);

        //filtrar lo que devuelve genre por db o api dependiendo de la opción selected desde  FitlerdbApi.jsx
        const dbApi = filterdbApi(genres, select.value);
        //despachamos los juegos ya filtrados por géneros y db/api
        dispatch(filters(dbApi));
      }

      //en caso de seleccionar allgenres filtra todos los juegos por la option selected db/api desde FitlerdbApi.jsx
      else {
        const dbApi = filterdbApi(state.copygames, select.value);
        dispatch(filters(dbApi));
      }
    } else {
      //caso de tener un option selected desde el filtro db/api
      //hacemos el filtrado solo por género
      genre === "allgenres"
        ? dispatch(filters(state?.copygames))
        : dispatch(filters(filter(state.copygames, genre)));
    }
  };

  return (
    <div>
      <select onChange={(e) => handleSelect(e)}>
        <option value={"allgenres"}>All genres</option>
        {state?.genres.map((genre) => {
          return (
            <option
              className="selectedGenre"
              value={genre.name}
              id={genre.id}
              key={genre.id}
            >
              {genre.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterGenre;
