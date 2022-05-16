import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { combineReducers } from "redux";
import groups from "./Reducers/groupsReducer"

const combineReducer = combineReducers({
    groupsdata : groups
})
// const thunkMiddleware = thunk()

const store = configureStore({
    reducer: combineReducer
  })
export default store;