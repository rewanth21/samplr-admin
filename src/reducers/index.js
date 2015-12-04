import { combineReducers } from 'redux'
import todos from './todos'
import users from './users'
import loginform from './loginform'

const rootReducer = combineReducers({
  todos, users, loginform
})

export default rootReducer
