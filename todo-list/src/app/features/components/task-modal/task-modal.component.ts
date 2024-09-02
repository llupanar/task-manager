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

  pattReg: RegExp = /^(?:\S+\s*){1,4}$/;

  dateValidator() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if(control.value){
        const currDate= new Date().setHours(0, 0, 0, 0);
        const selectedDate = new Date(control.value).setHours(0, 0, 0, 0);
        return selectedDate >= currDate? null : {date : true};
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
    'description' : new FormControl({value: '', disabled: true}, [Validators.maxLength(256)]),
    'dueDate': new FormControl({value: '', disabled: true}, [this.dateValidator()])
  })

  ngOnInit(){
    this.taskForm.patchValue({
      'id': this.task.id,
      'title': this.task.title,
      'description': this.task.description,
      'dueDate': this.task.dueDate
    })

    this.manageFieldState();

    this._title?.valueChanges.subscribe(() =>{
      this.manageFieldState();
    })
  }

  manageFieldState(){
    if (this._title?.valid){
      this._description?.enable();
      this._dueDate?.enable();
    } else{
      this._description?.disable();
      this._dueDate?.disable();
    }
  }

  get _title(){
    return this.taskForm.get('title')
  }
  get _description(){
    return this.taskForm.get('description')
  }
  get _dueDate(){
    return this.taskForm.get('dueDate')
  }

  checkTitle(){
    return this._title?.invalid && (this._title?.touched || this._title?.dirty)
  }

  checkDescription(){
    return this._description?.invalid && (this._description?.touched || this._description?.dirty)
  }

  checkDate(){
    return this._dueDate?.invalid && (this._dueDate?.touched || this._dueDate?.dirty)
  }

  saveTask(){
    if(!this.taskForm.invalid){ this.save.emit(this.taskForm.value) }
  }
}
