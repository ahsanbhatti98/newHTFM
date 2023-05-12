import * as types from "../actions/ActionTypes";

const initialState = {
  is_splash: true,
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.SPLASH_DONE:
      console.log("action type  SPLASH_DONE", action.data);
      return {
        ...state,
        is_splash: action.data,
      };

    default:
      return state;
  }
};
