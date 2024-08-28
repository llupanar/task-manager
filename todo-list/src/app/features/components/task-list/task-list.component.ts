import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Task } from '../../../shared/model/task';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, TaskModalComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor (private taskService : TaskService){
    //this.tasks = taskService.getTasks();
    this.tasks = [{
      id:0,
      title: 'one',
      description:' two',
      isCompleted:true,
      createdAt: new Date,
    },
    {
      id:1,
      title: 'one',
      description:' two',
      isCompleted:true,
      createdAt: new Date,
    },
    {
      id:2,
      title: 'one',
      description:' two',
      isCompleted:true,
      createdAt: new Date,
    }]
  }

  toggleDecr(task:Task){
    task.isShow=!task.isShow;
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
    this.selectedTask=task? {...task} : { id: NaN, title: '', description: '', createdAt: new Date(), isCompleted:false };
  }

  closeModal(){
    this.selectedTask=null;
  }
}
