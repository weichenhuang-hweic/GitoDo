import axios from 'axios';

// Develop server URL
const postBaseUrl = 'http://140.114.91.242:3000';
//const postBaseUrl = 'http://127.0.0.1:7000';

/* data should like this 
var data = qs.stringify({
  'account': 'apple',
  'email': 'Apple@apple.com',
  'name': 'Apple',
  'avatar_url': 'IIIIII',
  'password': 'banana' 
}); */
export function signIn(data) {
  let url = `${postBaseUrl}/user/signIn`;
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  return axios
    .post(url, data, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

/* data should like this 
var data = qs.stringify({
  'account': 'apple',
  'password': 'banana' 
}); */
export function logIn(data) {
  let url = `${postBaseUrl}/user/logIn`;
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  return axios
    .post(url, data, {
      headers: headers,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

// getUser
export function getUser(userId) {
  let url = `${postBaseUrl}/user/getUser/`;
  url = url + userId;
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  return axios
    .get(url, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

/* data should like this 
var data = qs.stringify({
  'account': 'apple',
  'email': 'Apple@apple.com',
  'name': 'Apple',
  'avatar_url': 'IIIIII',
  'password': 'banana' 
}); */
export function modifyUser(userId, data) {
  let url = `${postBaseUrl}/user/modifyUser/`;
  url = url + userId;
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  return axios
    .put(url, data, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

/* data should like this 
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('file', fs.createReadStream('/C:/Users/fuchi/Downloads/AIO_Zen_Wallpaper_3840x2160_1(default).jpg'));
e.g. with userId:60ccbb70e2b953f80f847287
This will generate this url: 'http://140.114.91.242:3000/user/avatar/60ccbb70e2b953f80f847287',
and make data uploaded as avatar
*/
export function modifyAvatar(userId, data) {
  let url = `${postBaseUrl}/user/avatar/`;
  url = url + userId;
  let headers = { 
    'Content-Type': 'application/json; charset=utf-8'
  }
  
  return axios.put(url, data, {
    headers: headers
  })
  .then((response) => {
	return response.data;
  })
  .catch((error) => {
	return error
  });
}

// searchUsers
// '/user/searchUsers/:string/:offset/:amount'
// for instance
// /user/searchUsers/Alice/0/5
// this will get you 5 matched data start from 0 of User name contain 'Alice'
export function searchUsers(string, offset, amount) {
  let url = `${postBaseUrl}/user/searchUsers/`;
  url = url + string + '/' + offset + '/' + amount;
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  // console.log(url)
  // console.log(headers)
  
  return axios.get(url, {
    headers: headers
  })
  .then((response) => {
	return response.data;
  })
  .catch((error) => {
	return error
  });
}
