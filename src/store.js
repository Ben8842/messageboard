import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

var composeParam;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  composeParam = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  composeParam = compose(applyMiddleware(...middleware));
}
const store = createStore(rootReducer, initialState, composeParam);
export default store;

/*
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}*/
