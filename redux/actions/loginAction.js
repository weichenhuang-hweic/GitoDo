export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const USER_AVATAR = 'USER_AVATAR';
export const CLEAR = 'CLEAR';
// should add now login status and login failed

export const clearUser = () => ({
  type: CLEAR,
});

export const loginSuccess = (userId) => ({
  type: LOGIN_SUCCESS,
  userId
});

export const userAvatar = (obj) => ({
  type: USER_AVATAR,
  obj
})