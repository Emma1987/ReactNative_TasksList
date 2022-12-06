import { ADD_TASK, GET_TASKS, DELETE_TASKS, UPDATE_TASKS } from "./constants";

export const addTask = tasksIndex => (
  {
    type: ADD_TASK,
    payload: tasksIndex,
  }
);

export const getTasks = tasksIndex => (
  {
    type: GET_TASKS,
    payload: tasksIndex,
  }
);

export const deleteTask = tasksIndex => (
  {
    type: DELETE_TASKS,
    payload: tasksIndex,
  }
);

export const updateTask = tasksIndex => (
  {
    type: UPDATE_TASKS,
    payload: tasksIndex,
  }
);
