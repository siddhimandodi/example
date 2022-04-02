import * as actionTypes from './actionTypes';

export const updateFavouriteAlbum = (payload) => {
  return {
    type: actionTypes.ADD_FAVOURITE_ALBUM,
    payload,
  };
};

export const removeFavouriteAlbum = (payload) => {
  return {
    type: actionTypes.REMOVE_FAVOURITE_ALBUM,
    payload,
  };
};

