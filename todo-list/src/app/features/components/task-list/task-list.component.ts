import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  styleUrl: './task-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent{
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  filterMode:string='all'

  constructor (private taskService : TaskService) {
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
    if(task.isCompleted) task.completeDate = new Date();
    this.tasks=this.taskService.saveTask(task)
  }
  
  deleteTask(id: number){
    this.tasks = this.taskService.deleteTask(id)
  }

  saveTask(task: Task){
    this.tasks=this.taskService.saveTask(task);
    this.closeModal();
  }

  openModal(task?:Task){
    this.selectedTask=task? {...task} : { id: Date.now(), title: '', description: '', isCompleted:false, isShow:false };
  }

  closeModal(){
    this.selectedTask=null;
  }
}