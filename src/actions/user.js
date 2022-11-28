import * as actionTypes from './actionTypes';

export const updateUserData = payload => {
  return {
    type: actionTypes.ADD_USER_DATA,
    payload,
  };
};
