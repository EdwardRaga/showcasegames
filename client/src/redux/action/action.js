import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const GET_DETAIL = "GET_DATAIL";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const ADD_GAME = "ADD_GAME";
export const SEARCH_GAME = "SEARCH_GAME";
export const FILTERS = "FILTERS";

export function getGames() {
  return async function (dispatch) {
    // try {
    //   const response = await axios.get(`/videogames`);
    //   dispatch({ type: GET_GAMES, payload: response.data });
    // } catch (error) {
    //   console.log(error);
    // }
  };
}
export function getGenres() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/genres`);
      dispatch({ type: GET_GENRES, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
}
export function getPlaforms() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/platforms`);
      dispatch({ type: GET_PLATFORMS, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function searchGame(name) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/videogames/games/search?name=${name}`);
      dispatch({ type: SEARCH_GAME, payload: response.data });
    } catch (error) {
      throw error;
    }
  };
}

export function filters(games) {
  return { type: FILTERS, payload: games };
}

export async function addGame(videogame) {
  try {
    console.log(videogame);
    const post = await axios.post("/videogames/", videogame);
    return post;
  } catch (e) {
    console.log(e);
  }
}

export async function detailGame(id) {
  try {
    const response = await axios.get(`/videogames/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
