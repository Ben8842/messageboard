import ActionTypes from "./types.js";

export const login = (data) => (dispatch) => {
  dispatch({
    type: ActionTypes.LOG_IN,
    payload: data,
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: ActionTypes.LOG_OUT,
  });
};
