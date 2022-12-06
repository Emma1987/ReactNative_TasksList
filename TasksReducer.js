import { combineReducers } from "redux";
import { ADD_TASK, GET_TASKS, DELETE_TASKS, UPDATE_TASKS } from "./constants";

const INITIAL_STATE = {
  tasks: [],
};

const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS:
      state.tasks = action.payload;
      return state.tasks;
    case ADD_TASK:
      let tasksWithAddedTask = state.unshift(action.payload);
      state.tasks = tasksWithAddedTask;
      return state.tasks;
    case DELETE_TASKS:
      let tasksWithoutDeletedTask = state.filter(function (task) {
        return task.id !== action.payload.id;
      });

      state.tasks = tasksWithoutDeletedTask;
      return state.tasks;
    case UPDATE_TASKS:
      let tasksUpdated = state.map(function (task) {
        if (task.id === action.payload.id) {
          task.user = action.payload.user;
        }
      });

      state.tasks = tasksUpdated;
      return state.tasks;
    default:
      return state;
  }
};

export default combineReducers({
  tasks: tasksReducer
});
