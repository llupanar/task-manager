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
  public tasks: Task[] = [];
  public selectedTask: Task | null = null;
  public filterMode:string='all'

  constructor (private taskService : TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  public setFilter(mode:string): void{
    this.filterMode=mode;
  }

  public toggleDecr(task:Task): void{
    task.isShow=!task.isShow;
  }

  public completeTask(task:Task): void{
    task.isCompleted=!task.isCompleted;
    if(task.isCompleted) task.completeDate = new Date();
    this.tasks=this.taskService.saveTask(task)
  }
  
  public deleteTask(id: number): void{
    this.tasks = this.taskService.deleteTask(id)
  }

  public saveTask(task: Task): void{
    this.tasks=this.taskService.saveTask(task);
    this.closeModal();
  }

  public openModal(task?:Task): void{
    this.selectedTask=task? {...task} : { id: Date.now(), title: '', description: '', isCompleted:false, isShow:false };
  }

  public closeModal(): void{
    this.selectedTask=null;
  }
}