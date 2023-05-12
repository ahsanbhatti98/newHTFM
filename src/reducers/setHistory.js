// @flow
import {
  SET_HISTORY,
  DELETE_ID,
  DELETE_ALL,
  UPDATE_HISTORY,
} from "../actions/ActionTypes";
import _ from "lodash";

const initialState = {
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HISTORY:
      const tempData = _.cloneDeep(state.data);

      const isItemFound = tempData.find(
        (item, index) => item.Id == action.data.Id
      );
      !isItemFound && tempData.unshift(action.data);

      return { ...state, data: tempData };
    case UPDATE_HISTORY:
      let updatedArray = [];
      const tempDump = _.cloneDeep(state.data);
      tempDump.map((item, index) => {
        if (item.Id == action.data.location_id) {
          item.favourite_id = action.data.id;
        }
        updatedArray.push(item);
      });

      return { ...state, data: updatedArray };
    case DELETE_ID:
      return deleteOperation(state, action);
    case DELETE_ALL:
      return { ...state, data: action.data };
    default:
      return state;
  }
};

const deleteOperation = (state, action) => {
  const tempData = _.cloneDeep(state.data);
  let updatedArray = tempData.filter((item, index) => item.Id != action.data);
  console.log("updatedArray", updatedArray);
  return {
    ...state,
    data: updatedArray,
  };
};
