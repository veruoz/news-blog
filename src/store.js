import {applyMiddleware, createStore} from "redux";
import rootReducers from "./reducers";
import logger from "redux-logger";

const store = createStore(rootReducers, applyMiddleware(logger))

export default store
