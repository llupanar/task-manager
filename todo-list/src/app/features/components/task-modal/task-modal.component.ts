import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../shared/model/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent {
  @Input() task!: Task;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  saveTask() {
    this.save.emit();
  }
}
