import thunkMiddleware from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducer/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
