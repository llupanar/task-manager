import { Injectable } from '@angular/core';
import { Task } from '../../shared/model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() {}

  private tasksKey = 'tasks'

  public getTasks() : Task[]{
    const tasks = localStorage.getItem(this.tasksKey);
    return tasks? JSON.parse(tasks) : []; 
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
  }
}
