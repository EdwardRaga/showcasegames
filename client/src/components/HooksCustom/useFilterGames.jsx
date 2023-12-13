import { useEffect, useState } from "react";
import filterbdApi from "../Filters/FilterdbApi/FilterdbApi";
import filterGenre from "../Filters/FilterGenre/filter";
import axios from "axios"

export default function useFilterGames(searchName, select, selectGenre) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let url = `${process.env.REACT_APP_FETCH_BASE_URL}/videogames`;
    if (searchName.name.length > 0) {
      url = `${url}/games/search?name=${searchName.name}`;

    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let filteredGames = data;
        if (select) {
          filteredGames = filterbdApi(filteredGames, select.value);
        }
        if (selectGenre) {
          filteredGames = filterGenre(filteredGames, selectGenre.value);
        }
        if (!Array.isArray(filteredGames)){
            throw new Error("No games were found with the provided search term");
            
        }
        if (filteredGames.length === 0) {
          throw new Error("No games found!");
        }
        setGames(filteredGames);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  }, [searchName, select, selectGenre]);

  return [games, loading, error];
}
