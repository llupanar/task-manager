import { Injectable } from '@angular/core';
import { Task } from '../../shared/model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() {
    this.tasks = this.getTasks()
   }

  private tasksKey = 'tasks'
  private tasks: Task[] = []

  getTasks() : Task[]{
    const tasks = localStorage.getItem(this.tasksKey);
    return tasks? JSON.parse(tasks) : []; 
  }

  deleteTask(id: number): Task[]{
    this.tasks = this.tasks.filter(task=>task.id!==id)
    this.saveTasks(this.tasks)
    return this.tasks
  }

  saveTask(task: Task): Task[]{
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index === -1) {
      this.tasks = [...this.tasks, task]; 
    } else {
      this.tasks = this.tasks.map(t => t.id === task.id ? task : t); 
    }
    this.saveTasks(this.tasks);
    return this.tasks
  }

  saveTasks(tasks: Task[]): void{
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
  }
}
