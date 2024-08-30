import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../../../shared/model/task';
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TaskModalComponent {
  @Input() task!: Task;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Task>();

  taskForm:FormGroup = new FormGroup({
      'id' : new FormControl(),
      'title' : new FormControl('',Validators.required),
      'description' : new FormControl(),
      'dueDate': new FormControl()
  })

  ngOnInit(){
    this.taskForm.patchValue({
      'id':this.task.id,
      'title': this.task.title,
      'description': this.task.description,
      'dueDate': this.task.dueDate
    })
  }

  get _title(){
    return this.taskForm.get('title')
  }

  checkTitle(){
    return this._title?.invalid && (this._title.touched || this._title.dirty)
  }
  saveTask(){
    if(!this.taskForm.invalid){ this.save.emit(this.taskForm.value) }
  }
}
