import style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card(props) {
  const { id, name, image, genres } = props;

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.img}>
          <Link to={`detail/${id}`}>
            <img src={image} alt="image_game" />
          </Link>
        </div>
        <div className={style.name_genres}>
          <p>{name}</p>
          <div className={style.genre}>
            {genres?.map((genre) => {
              return <p>{genre.name}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
