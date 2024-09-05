import { createFeatureSelector } from "@ngrx/store";
import { Task } from "../../shared/model/task";

export const selectTasks = createFeatureSelector<Task[]>('tasks');
