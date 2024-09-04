import { FormControl } from "@angular/forms";

export interface TaskForm {
    id: FormControl<number | null>;
    title: FormControl<string>;
    description: FormControl<string>;
    dueDate: FormControl<string | null>;
  }
