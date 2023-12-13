import style from "./Home.module.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../Cards/Cards";
import FilterdbApi from "../Filters/FilterdbApi/FilterdbApi.jsx";
import Paginate from "../Paginated/Paginated";
import FilterRating from "../Filters/FilterRating/FilterRating";
import FilterGenre from "../Filters/FilterGenre/FilterGenre";
import FilterAZ from "../Filters/FilterAZ/FilterAZ";
import FilterName from "../Filters/FilterName/FilterName";
import Loading from "../Loading/Loading";
import { getGames, getGenres } from "../../redux/action/action";

export default function Home() {
  const videogames = useSelector((state) => state.videogames);
  const dispatch = useDispatch();

  const [games, setgames] = useState([...videogames]);
  const [paginate, setPaginate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingFilters, setLoadingFilters] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([dispatch(getGames()), dispatch(getGenres())]).then(
      (results) => {
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    setgames([...videogames]);
  }, [videogames]);

  useEffect(() => {
    setPaginate(games.slice(0, 15));
  }, [games]);

  return (
    <>
      {loading && <Loading />}

      {!loading && (
        <div className={style.wrapper}>
          <div className={style.filterSection}>
            <div className={style.filter_name}>
              <FilterName
                setError={setError}
                setgames={setgames}
                loadingFilters={loadingFilters}
                setLoadingFilters={setLoadingFilters}
              />
            </div>
            {
              <div className={style.filters}>
                <div className={style.select}>
                  <FilterGenre />
                  <FilterdbApi setgames={setgames} />
                </div>
                {!error && games?.length > 1 && (
                  <div className={style.botones}>
                    <FilterRating setgames={setgames} games={games} />
                    <FilterAZ setgames={setgames} games={games} />
                  </div>
                )}
              </div>
            }
          </div>
          {!error && !loadingFilters && (
            <div>
              <main className={style.main}>
                <Cards paginate={paginate} />
              </main>
            </div>
          )}
          {!error && !loadingFilters && (
            <div className={style.paginate}>
              <Paginate
                videogames={games}
                setPaginate={setPaginate}
                setLanding={setLoading}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      )}
      {error && <p id={style.error}>{error}</p>}
    </>
  );
}
