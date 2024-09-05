import { createAction, props } from "@ngrx/store";
import { Task } from "../../shared/model/task";

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ id: number }>());
export const updateTask = createAction('[Task] Update Task', props<{ task: Task }>());
