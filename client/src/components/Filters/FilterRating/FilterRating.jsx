import style from "./FilterRating.module.css";
import filter from "./filter";
import { useSelector, useDispatch } from "react-redux";
import { filters } from "../../../redux/action/action";
import { Link } from "react-router-dom";
import { faTrophy, faGhost } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FilterRating({ games}) {
  const state = useSelector((state) => state.videogames);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    event.preventDefault();
    const rating = event.target.name;
    console.log(state);
    dispatch(filters(filter(games, rating)));
  };

  return (
    <div className={style.container}>
      <Link name={"top"} onClick={handleClick}>
        <FontAwesomeIcon icon={faTrophy} style={{ color: "white" }} />
        Best Rated
      </Link>
      <Link name={"buttom"} onClick={handleClick}>
        <FontAwesomeIcon icon={faGhost} style={{ color: "white" }} />
        Worst Rated
      </Link>
    </div>
  );
}
