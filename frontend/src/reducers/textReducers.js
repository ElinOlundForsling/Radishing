import {
  TEXT_CONTENT_REQUEST,
  TEXT_CONTENT_SUCCESS,
  TEXT_CONTENT_FAIL,
  TEXT_UPDATE_REQUEST,
  TEXT_UPDATE_SUCCESS,
  TEXT_UPDATE_FAIL,
  TEXT_UPDATE_RESET,
} from '../constants/textConstants';

export const textContentReducer = (state = {}, action) => {
  switch (action.type) {
    case TEXT_CONTENT_REQUEST:
      return { ...state, loading: true };
    case TEXT_CONTENT_SUCCESS:
      return {
        loading: false,
        home: action.payload.home,
        about: action.payload.about,
        privacy: action.payload.privacy,
        openingHours: action.payload.openingHours,
      };
    case TEXT_CONTENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const textUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TEXT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case TEXT_UPDATE_SUCCESS:
      return { loading: false, text: action.payload };
    case TEXT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TEXT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
