export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    completeDate?: Date;
    isCompleted: boolean;
    isShow: boolean;
}