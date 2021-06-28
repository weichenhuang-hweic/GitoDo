import axios from 'axios';

// Develop server URL
const postBaseUrl = 'http://140.114.91.242:3000';
//const postBaseUrl = 'http://127.0.0.1:7000';

/* data should like this 
var data = qs.stringify({
  'mother_line_id': '60add8d07ce322492421408f',
  'create_date': '2017-10-22T08:01:35.915+00:00',
  'due_date': '1939-11-22T08:01:35.915+00:00',
  'title': 'BUY MASK',
  'url': 'http://MMM%(&^*&^.com',
  'content': 'MASK',
  'is_main': 'true' 
}); */
export function addNode(data) {
  let url = `${postBaseUrl}/node/addNode`;
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

// modifyNode
// '/node/modifyNode/:nodeId'
// for instance
// /node/modifyNode/60bb5b1ef2c6582b88fb0083
/* 
NO INTEGRITY CHECK!!!
BE CAREFUL ABOUT WHAT YOU DOING!!!
Note: The following are not allow to modify "mother_line_id, branch_line_id"

data should like this 
You only need to put what you want to change into it
var data = qs.stringify({
  'mother_line_id': '60add8d07ce322492421408f',
//   'create_date': '2017-10-22T08:01:35.915+00:00',
//   'due_date': '1939-11-22T08:01:35.915+00:00',
//   'title': 'BUY MASK',
//   'url': 'http://MMM%(&^*&^.com',
//   'content': 'MASK',
//   'is_main': 'true' 
}); */
export function modifyNode(nodeId, data) {
  let url = `${postBaseUrl}/node/modifyNode/`;
  url = url + nodeId;
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

// getNode
// '/node/getNode/:id'
export function getNode(nodeId) {
  let url = `${postBaseUrl}/node/getNode/`;
  url = url + nodeId;
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

// deleteNode
// '/node/deleteNode/:lineId/:nodeId'
// also, if you are deleting last node of a line
// the line will be deleted as well
export function deleteNode(lineId, nodeId) {
  let url = `${postBaseUrl}/node/deleteNode/`;
  url = url + lineId + '/' + nodeId;
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  return axios
    .delete(url, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

// addSubtask
/* data should like this 
var data = qs.stringify({
  'subtask': '45343544147',
  'done': 'true',
  'nodeId': '60c320e6e46b792cdc86a644' 
}); */
// a data configuration like above will
// create a subtask at the tail of subtask array of node '60c320e6e46b792cdc86a644'
export function addSubtask(data) {
  let url = `${postBaseUrl}/node/addSubtask`;
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

// modifySubTask
// '/node/modifySubTask/:nodeId'
// for instance
// /node/modifySubTask/60c320e6e46b792cdc86a644
/* 
WITH INDEX CHECK!!!
IF YOU PROVIDE A OUT OF RANGE INDEX YOU WILL GET A 400

data should like this 
Every part of data is needed
var data = qs.stringify({
  'subtask': '45343544147',
  'done': 'false',
  'subtaskIdx': '0' 
}); */
export function modifySubTask(nodeId, data) {
  let url = `${postBaseUrl}/node/modifySubTask/`;
  url = url + nodeId;
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

// deleteSubTask
// '/node/deleteSubTask/:nodeId/:subtaskIdx'
// for instance
// /node/deleteSubTask/60c320e6e46b792cdc86a644/1
// this will remove subtask with 'subtaskIdx' of subtask array of 'nodeId'
export function deleteSubTask(nodeId, subtaskIdx) {
  let url = `${postBaseUrl}/node/deleteSubTask/`;
  url = url + nodeId + '/' + subtaskIdx;
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  // console.log(url)
  // console.log(headers)
  
  return axios.delete(url, {
    headers: headers
  })
  .then((response) => {
	return response.data;
  })
  .catch((error) => {
	return error
  });
}
