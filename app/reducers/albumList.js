import * as actionTypes from '@actions/actionTypes';
import {concat, remove} from 'lodash';

const initialState = {
  data: [],
  loading: false,
  favouriteAlbum: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.ALBUM_FETCH:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ALBUM_FETCH_SUCCESS:
      return {
        ...state,
        data: state.data.concat(action.data),
        loading: false,
      };
    case actionTypes.ADD_FAVOURITE_ALBUM:
      return {
        ...state,
        favouriteAlbum: [...state.favouriteAlbum, action.payload],
      };
    case actionTypes.REMOVE_FAVOURITE_ALBUM:
      remove(state.favouriteAlbum, (item) => {
        return item.trackId === action.payload.trackId;
      });
      return {
        ...state,
        favouriteAlbum: concat(state.favouriteAlbum),
      };
    case actionTypes.CLEAR_FAVOURITE_ALBUM:
      return {
        ...state,
        favouriteAlbum: [],
      };
    default:
      return state;
  }
};
