import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../shared/model/task';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(tasks: Task[], filter: string): Task[] {
    if (!tasks) return [];
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.isCompleted);
      case 'incomplete':
        return tasks.filter(task => !task.isCompleted);
      default:
        return tasks;
    }
  }
}
