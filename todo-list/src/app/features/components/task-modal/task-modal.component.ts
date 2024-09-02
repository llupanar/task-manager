import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../../../shared/model/task';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  pattReg: RegExp = /^(\S+\s+){0,3}\S+?$/

  dateValidator = () => {
    return (
        control: AbstractControl
    ) : {[key: string] : boolean} | null =>{
      if(control.value){
      let currDate= new Date()
      let valid = new Date(control.value) > currDate 
      return valid? null : {date : true}
      }
      return null;
    }
  }

  taskForm:FormGroup = new FormGroup({
      'id' : new FormControl(),
      'title' : new FormControl('',[
                                      Validators.required,
                                      Validators.pattern(this.pattReg)
                                    ]),
      'description' : new FormControl('',[Validators.maxLength(256)]),
      'dueDate': new FormControl('',[this.dateValidator()])
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

  checkDescription(){
    const control = this.taskForm.controls['description']
    return control.invalid && (control.touched || control.dirty)
  }

  checkDate(){
    const control = this.taskForm.controls['dueDate']
    return control.invalid && (control.touched || control.dirty)
  }

  saveTask(){
    if(!this.taskForm.invalid){ this.save.emit(this.taskForm.value) }
  }
}