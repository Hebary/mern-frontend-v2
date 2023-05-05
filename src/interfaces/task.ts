export interface Task {
    name: string;
    description: string;
    priority: string;
    deliveryDate: string;
    project: string;
    state: boolean;
    _id?: string;
}