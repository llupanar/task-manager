import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../shared/model/task';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() task!:Task;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() toggle = new EventEmitter<void>();

  toggleDescr(){
    this.toggle.emit();
  }

  editTask(){
    this.edit.emit();
  }

  deleteTask(){
    this.delete.emit();
  }
}
