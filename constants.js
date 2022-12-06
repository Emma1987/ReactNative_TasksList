import { create } from "apisauce";

export const api = create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const ADD_TASK = 'ADD_TASK';
export const GET_TASKS = 'GET_TASKS';
export const DELETE_TASKS = 'DELETE_TASKS';
export const UPDATE_TASKS = 'UPDATE_TASKS';
