import {
  GET_GAMES,
  SEARCH_GAME,
  FILTERS,
  GET_GENRES,
  GET_PLATFORMS,
} from "../action/action";

const initialState = {
  videogames: [],
  copygames: [],
  genres: [],
  platforms: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        videogames: [...action.payload],
        copygames: [...action.payload],
      };
    case GET_GENRES:
      return {
        ...state,
        genres: [...action.payload],
      };
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: [...action.payload],
      };
    case SEARCH_GAME:
      return {
        ...state,
        videogames: [...action.payload],
      };
    case FILTERS: {
      return {
        ...state,
        videogames: [...action.payload],
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
