import loginReducer from './loginReducer';
import branchReducer from './branchReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  login: loginReducer,
  branch: branchReducer,
});

export default rootReducer;