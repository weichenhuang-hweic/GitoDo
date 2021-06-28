import {
  getUser,
} from '../../api/user';
import {
  getLine, 
} from '../../api/line';


export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const END_LIST_BRANCH = 'END_LIST_BRANCH';
export const END_LIST_ALL_CLEAR = 'END_LIST_ALL_CLEAR';
export const END_LIST_ALL_MORE = 'END_LIST_ALL_MORE';
export const END_LIST_MAIN_CLEAR = 'END_LIST_MAIN_CLEAR';
export const END_LIST_MAIN_MORE = 'END_LIST_MAIN_MORE';
export const END_LIST_TASK_CLEAR = 'END_LIST_TASK_CLEAR';
export const END_LIST_TASK_MORE = 'END_LIST_TASK_MORE';
export const BUFFER_LINE = 'BUFFER_LINE';
export const END_BUFFER_ALL_CLEAR = 'END_BUFFER_ALL_CLEAR';
export const END_BUFFER_ALL_MORE = 'END_BUFFER_ALL_MORE';
export const CLEAR = 'CLEAR';

/* branch */

export const clear = () => ({
  type: CLEAR
})

export const startLoading = () => ({
  type: START_LOADING
})

export const endLoading = () => ({
  type: END_LOADING
})

export const endListMainBranch = (mainLine) => ({
  type: END_LIST_BRANCH,
  mainLine
})

export const endListAllLineClear = () => ({
  type: END_LIST_ALL_CLEAR,
})

export const endListAllLineMore = (allLine, node_id, owner, mother, time) => ({
  type: END_LIST_ALL_MORE,
  allLine, 
  node_id,
  owner,
  mother,
  time
})

export const endListAllMainClear = () => ({
  type: END_LIST_MAIN_CLEAR,
})

export const endListAllMainMore = (allLine, owner, mother) => ({
  type: END_LIST_MAIN_MORE,
  allLine, 
  owner,
  mother
})

export const endListTaskClear = () => ({
  type: END_LIST_TASK_CLEAR,
})

export const endListTaskMore = (task) => ({
  type: END_LIST_TASK_MORE,
  task
})

export function listMainBranch (userId) {
  return (dispatch) => {
    dispatch(startLoading());
    return getUser(userId).then(user => {
        getLine(user.todo_host).then(line => {
          dispatch(endListMainBranch(line));
        })
    }).catch(err => {
        console.error('Error listing branches', err);
    }).then(() => {
        dispatch(endLoading())
    });
  };
}

export function listAllLine_more (allLine, node_id, owner, mother, time = Date.now()) {
  return (dispatch) => {
    dispatch(startLoading());
    dispatch(endListAllLineMore(allLine, node_id, owner, mother, time));
    dispatch(endLoading());
  };
}

export function listAllMain_more (allLine, owner, mother) {
  return (dispatch) => {
    dispatch(startLoading());
    dispatch(endListAllMainMore(allLine, owner, mother));
    dispatch(endLoading());
  };
}

export function listAllTask_more (task) {
  return (dispatch) => {
    dispatch(startLoading());
    dispatch(endListTaskMore(task));
    dispatch(endLoading());
  }
}