import ActionTypes from "../actions/types.js";

const initialState = {
  emailR: null,
  data: null,
  isLoggedIn: false,
};

const reducerMessage = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOG_IN:
      const userData = {
        emailR: action.payload.email,
        data: action.payload,
        isLoggedIn: true,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    case ActionTypes.LOG_OUT:
      localStorage.removeItem("user");
      return initialState;

    default:
      return state;
  }
};

export default reducerMessage;
