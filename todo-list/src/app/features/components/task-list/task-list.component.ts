import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Task } from '../../../shared/model/task';
import { TaskService } from '../../service/task.service';
import { FilterPipe } from '../../../core/pipes/filter.pipe';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, TaskModalComponent, FilterPipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  filterMode:string='all'

  constructor (private taskService : TaskService){
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }
  setFilter(mode:string){
    this.filterMode=mode;
  }
  toggleDecr(task:Task){
    task.isShow=!task.isShow;
  }

  completeTask(task:Task){
    task.isCompleted=!task.isCompleted;
    this.taskService.saveTasks(this.tasks)
  }

  deleteTask(id: number){
    this.tasks=this.tasks.filter(task=>task.id!==id)
    this.taskService.saveTasks(this.tasks)
  }

  saveTask(){
    if (this.selectedTask) {
      const index = this.tasks.findIndex(t => t.id === this.selectedTask!.id);
      if (index === -1) {
        this.tasks.push(this.selectedTask);
      } else {
        this.tasks[index] = this.selectedTask;
      }
      this.taskService.saveTasks(this.tasks);
    }
    this.closeModal();
  }

  openModal(task?:Task){
    this.selectedTask=task? {...task} : { id: Date.now(), title: '', description: '', dueDate: new Date(), isCompleted:false, isShow:false };
  }

  closeModal(){
    this.selectedTask=null;
  }
}
