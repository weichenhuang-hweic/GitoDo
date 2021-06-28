import {HYDRATE} from 'next-redux-wrapper';
import {REHYDRATE} from 'redux-persist';
import {
  START_LOADING,
  END_LOADING,
  END_LIST_BRANCH,
  END_LIST_ALL_CLEAR,
  END_LIST_ALL_MORE,
  END_LIST_MAIN_CLEAR,
  END_LIST_MAIN_MORE,
  END_LIST_TASK_CLEAR,
  END_LIST_TASK_MORE,
  CLEAR,
} from '../actions/branchActions'

const initialMainBranchState = {
  mainLine: null,
  branchLoading: false,
  allLine: [{_id: '0'}],
  task: [{_id: '0'}],
  allMain: [{_id: '0'}],
}

const branchReducer = (state = initialMainBranchState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {...state};
    case REHYDRATE:
      return {...state};
    case CLEAR:
      return {initialMainBranchState};
    case START_LOADING:
      return {...state, branchLoading: true};
    case END_LOADING:
      return {...state, branchLoading: false};
    case END_LIST_BRANCH:
      return {...state, mainLine: action.mainLine};
    case END_LIST_ALL_CLEAR:
      return {...state, allLine: [{_id: '0'}]};
    case END_LIST_ALL_MORE:
      {
        let task_new = [{_id:'0'}];
        let state_task = [...state.allLine];
        let state_i = 1;
        let action_i = 0;
        while (state_i < state_task.length || action_i < 1) {
          if(state_i >= state_task.length && action_i < 1) {
            task_new = [...task_new, {Line:action.allLine, node_id:action.node_id, owner:action.owner, mother:action.mother, time:action.time}];
            action_i++;
          }
          else if(state_i < state_task.length && action_i >= 1) {
            task_new = [...task_new, state_task[state_i]];
            state_i++;
          }
          else {
            let state_ms = state_task[state_i].time;
            let action_ms = action.time
            if(state_ms <= action_ms) {
              task_new = [...task_new, state_task[state_i]];
              state_i++;
            } else {
              task_new = [...task_new, {Line:action.allLine, node_id:action.node_id, owner:action.owner, mother:action.mother, time:action.time}];
              action_i++;
            }
          }
        }
        return {...state, allLine: [...task_new]};
      }
    case END_LIST_MAIN_CLEAR:
      return {...state, allMain: [{_id: '0'}, {Line:{'_id':'0', 'title':'Set as Main Branch', 'color_RGB': [0, 0, 0], 'owner': '0'} , owner:'' ,mother:state.mainLine}]};
    case END_LIST_MAIN_MORE:
      return {...state, allMain: [...state.allMain, {Line:action.allLine, owner:action.owner, mother:action.mother}]};
    case END_LIST_TASK_CLEAR:
      return {...state, task: [{_id: '0'}]};
    case END_LIST_TASK_MORE:
      return {...state, task: action.task};
    default:
      return {...state};
  }
};

export default branchReducer;