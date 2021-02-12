import axios from 'axios';
import { logout } from './userActions';
import {
  TEXT_CONTENT_REQUEST,
  TEXT_CONTENT_SUCCESS,
  TEXT_CONTENT_FAIL,
  TEXT_UPDATE_REQUEST,
  TEXT_UPDATE_SUCCESS,
  TEXT_UPDATE_FAIL,
} from '../constants/textConstants';

export const getTextContent = id => async dispatch => {
  try {
    dispatch({ type: TEXT_CONTENT_REQUEST });

    const { data } = await axios.get('/api/text');

    dispatch({
      type: TEXT_CONTENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEXT_CONTENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateText = text => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEXT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put('/api/text', text, config);

    dispatch({
      type: TEXT_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: TEXT_CONTENT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: TEXT_UPDATE_FAIL,
      payload: message,
    });
  }
};
