import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, importProvidersFrom, OnInit } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Task } from '../../../shared/model/task';
import { TaskService } from '../../service/task.service';
import { FilterPipe } from '../../../core/pipes/filter.pipe';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTasks } from '../../../core/storage/task.selector';
import { addTask, deleteTask, updateTask } from '../../../core/storage/task.actions';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, TaskModalComponent, FilterPipe ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent{
  public tasks$: Observable<Task[]> | null = null;
  public selectedTask: Task | null = null;
  public filterMode:string='all'
  private isAdd: boolean = false

  constructor( private store: Store<{ tasks: Task[] }>, private taskService: TaskService) {
    this.loadTasks();
    this.tasks$ = this.store.select(selectTasks);
  }

  private loadTasks(): void{
    const tasks: Task[] = this.taskService.getTasks();
    tasks.forEach(task => this.store.dispatch(addTask({ task })));
  }
  
  public setFilter(mode:string): void{
    this.filterMode=mode;
  }

  public toggleDecr(taskA:Task): void{
    let task: Task = structuredClone(taskA)
    task.isShow=!task.isShow;
    this.store.dispatch(updateTask({ task }));
  }

  public completeTask(taskA:Task): void{
    let task: Task = structuredClone(taskA)
    task.isCompleted=!task.isCompleted;
    if(task.isCompleted) task.completeDate = new Date();
    this.store.dispatch(updateTask({ task }));
  }
  
  public deleteTask(id: number): void{
    this.store.dispatch(deleteTask({ id }));
  }

  public saveTask(task:Task){
    if(this.isAdd){
    this.store.dispatch(addTask({ task }));
    }else{
      this.store.dispatch(updateTask({ task }));
    }
    this.closeModal()
  }

  @HostListener('window:beforeunload')
  private updateLocalStorage(): void {
    this.store.select(selectTasks).subscribe((tasks: Task[]) => {
      this.taskService.saveTasks(tasks);
    });
  }

  public openModal(task?:Task): void{
    if(task){this.isAdd=false}
    else {this.isAdd=true}
    this.selectedTask=task? {...task} : { id: Date.now(), title: '', description: '', isCompleted:false, isShow:false };
  }

  public closeModal(): void{
    this.selectedTask=null;
  }
}