import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService 
{

  private tasks: Task[] = [
    new Task(1, 'Learn Angular', 'Study TypeScript syntax, rules and perform CRUD operation', false),
    new Task(2, 'Learn Algorithms', "Striver, neetcode, mycodeschool", false),
    new Task(3, 'Healthy habits', "Eat clean, run, lift, stretch", false)
  ]

  constructor() 
  {
    this.loadTasksFromLocalStorage(); 
  }


  private loadTasksFromLocalStorage(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  private saveTasksToLocalStorage(): void
  {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }


  getTasks()
  {
    return this.tasks;
  }

  getTaskbyId(id:number): Task | undefined
  {
      return this.tasks.find(task => task.id === id);
  }


  addTask(newTask: { title:string, description:string }):void
  {
    const id = this.tasks.length + 1;
    this.tasks.push(new Task(id, newTask.title, newTask.description));
    this.saveTasksToLocalStorage();
  }

  editTask(id: number, title: string, description: string): void 
  {
      const task = this.getTaskbyId(id);
      if (task) {
      task.title = title;
      task.description = description;
      this.saveTasksToLocalStorage();
    }
  }

  deleteTask(id: number): void 
  {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasksToLocalStorage();
  }

  toggleTaskStatus(id: number): void 
  {
      const task = this.tasks.find((task) => task.id === id);
      if (task) 
      {
         task.isComplete = !task.isComplete;
         this.saveTasksToLocalStorage();
      }
  }

}//TaskService code
