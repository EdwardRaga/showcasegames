import { detailGame } from "../../redux/action/action";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./Detail.module.css";
import Loading from "../Loading/Loading";
import { Link, useHistory } from "react-router-dom";

//icons
import { faStar, faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Detail() {
  const [game, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(null);

  const history = useHistory();

  const params = useParams();

  useEffect(() => {
    detailGame(params.id).then((data) => {
      setDetail(data);
      setLoading(false);
      setRating(Math.floor(data.rating));
    });
  }, []);

  const handleClickBack = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <>
      {!loading && history && (
        <div className={style.goback}>
          <Link onClick={handleClickBack} id={style.icon}>
            {" "}
            <FontAwesomeIcon icon={faBackward} />
            GoBack
          </Link>
        </div>
      )}

      {loading && <Loading />}
      {!loading && (
        <div className={style.container}>
          <h1>{game.name}</h1>
          <div>
            <p className={style.released}>{game.released}</p>
          </div>
          <img src={game.background_image} alt="" className={style.image} />

          <div className={style.rating}>
            {rating &&
              Array.from({ length: rating }, () => "stars").map((star) => {
                return <FontAwesomeIcon icon={faStar} styles={"white"} />;
              })}
          </div>

          <div className={style.genres_platforms}>
            <div className={style.wrapper_genres}>
              <label>Genres</label>

              <div className={style.genres}>
                {game.genres?.map((platform) => {
                  return <p>{platform?.name}</p>;
                })}
              </div>
            </div>

            <div className={style.wrapper_platforms}>
              <label>Platforms</label>

              <div className={style.platforms}>
                {game.platforms?.map((platform) => {
                  return <p>{platform?.platform?.name}</p>;
                })}
              </div>
            </div>
          </div>
          <div
            className={style.description}
            dangerouslySetInnerHTML={{ __html: game.description }}
          ></div>
        </div>
      )}
    </>
  );
}
