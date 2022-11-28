import * as actionTypes from '@actions/actionTypes';

const initialState = {
  data: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.ADD_USER_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
