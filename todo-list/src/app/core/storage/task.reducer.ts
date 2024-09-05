import { createReducer, on } from '@ngrx/store';
import { Task } from '../../shared/model/task';
import { addTask, deleteTask, updateTask } from './task.actions';

export const initialState: Task[] = [];

const _taskReducer = createReducer<Task[]>(
  initialState,
  on(addTask, (state, { task }) => {
    return [...state, task]; 
  }),
  on(deleteTask, (state, { id }) => {
    return state.filter(task => task.id !== id); 
  }),
  on(updateTask, (state, { task }) => {
    return state.map(t => (t.id === task.id ? task : t)); 
  })
);

export function taskReducer(state: Task[] | undefined, action: any): Task[] {
  return _taskReducer(state, action);
}
