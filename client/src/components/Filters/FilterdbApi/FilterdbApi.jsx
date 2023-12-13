import filter from "./FilterdbApi";
import filterGenre from "../FilterGenre/filter";
import { useSelector } from "react-redux";

export default function FilterdbApi({ setgames }) {
  const state = useSelector((state) => state);

  const handleSelect = (event) => {
    const target = event.target.value;
    //al haber un cambio en el select de db/api verifica sí el select de géneros tiene un option selected
    const genreselected = document.getElementsByClassName("selectedGenre");
    const genreArray = Array.from(genreselected);
    const selectGenre = genreArray.find((ele) => ele.selected);
    //sí el filtro de db/api tiene selected allgames verifica si en el filtro de géneros hay un option selected.
    if (target === "allgames") {
      //verifíca si hay un selected en géneros
      if (selectGenre) {
        //filtra los juegos por el género selected desde  FilterGenre.jsx con su función de filtrado por género
        setgames(filterGenre(state.copygames, selectGenre?.value));
      }
      // sí no tiene un género selected seteamos con todos los juegos sin ningún filtro
      else {
        setgames(state.copygames);
      }
    }
    //sí el filtro de db/api tiene selected DB o API
    else {
      // verifica si en el filtro de géneros hay un option selected.
      if (selectGenre) {
        //filtra los juegos por el género selected desde  FilterGenre.jsx con su función de filtrado por género
        const filterByGenders = filterGenre(
          state.copygames,
          selectGenre?.value
        );
        //filtra los juegos de un género por la opcion selected api / db
        const dbApi = filter(filterByGenders, target);
        setgames(dbApi);
      }
      // sí no tiene un género selected seteamos con todos los juegos solo con el filtro de db o api
      else {
        setgames(filter(state.copygames, target));
      }
    }
  };

  return (
    <div>
      <select onChange={handleSelect} id={"select"}>
        <option value="allgames" defaultValue>
          All games
        </option>
        <option className="dbapi" value="database">
          Database
        </option>
        <option className="dbapi" value="api">
          Api
        </option>
      </select>
    </div>
  );
}
