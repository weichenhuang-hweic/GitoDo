import {LOGIN_SUCCESS, USER_AVATAR, CLEAR} from '../actions/loginAction'
import {HYDRATE} from 'next-redux-wrapper';
import {REHYDRATE} from 'redux-persist';

const loginReducer = (state = {userId: -1, avatar_uri: null}, action) => {
  switch (action.type) {
    case HYDRATE:
      return {...state, ...action.userId};
    case REHYDRATE:
      return {...state, ...action.userId};
    case CLEAR:
      return {userId: -1, avatar_uri: null};
    case LOGIN_SUCCESS:
      return {...state, userId: action.userId};
    case USER_AVATAR:
      return  {...state, avatar_uri: action.obj};
    default:
      return {...state};
  }
};

export default loginReducer;