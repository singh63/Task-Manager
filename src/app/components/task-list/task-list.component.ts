import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';


@Component({
  selector: 'app-task-list', 
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, MatRadioModule, MatCheckboxModule,
    FormsModule, CommonModule, RouterModule,
    MatSelectModule, MatFormFieldModule, MatSidenavModule,
    MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit
{
    tasks: Task[] = [];
    filteredTasks: Task[] = [];
    filter: string = 'All';
    

    constructor(private taskService: TaskService, private snackBar: MatSnackBar, private router: Router) 
    {
       //this.loadTasks();
    }

    ngOnInit(): void
    {
        this.loadTasks();
    }

    loadTasks(): void
    {
        this.tasks = this.taskService.getTasks();
        this.applyFilter();
    }

    // getTasks() {
    //   this.tasks = this.taskService.getTasks();
    // }

    applyFilter(): void
    {
      if (this.filter === 'Completed')
      {
        this.filteredTasks = this.tasks.filter((task) => task.isComplete);
      }
      else if (this.filter === 'Incomplete')
      {
        this.filteredTasks = this.tasks.filter((task) => !task.isComplete);
      }
      else//shows all tasks
      {
        this.filteredTasks = this.tasks;
      }
    }
  

    navigateToTaskList(): void 
    {
      this.router.navigate(['/tasks']);
    }

    toggleStatus(id: number): void 
    {
      this.taskService.toggleTaskStatus(id);
    }

    deleteTask(id: number): void 
    {
      const task = this.taskService.getTaskbyId(id);
      if (task && confirm(`Are you sure you want to delete the task: "${task.title}"?`)) 
      {
        this.taskService.deleteTask(id);
        this.snackBar.open(`Task "${task.title}" has been deleted.`, 'Close', {
          duration: 3000, // Duration in milliseconds
        });
        this.loadTasks();
      }
    }

    onFilterChange(newFilter: string): void
    {
      if(!newFilter)
      {
        this.filter = newFilter;
        this.applyFilter();
      }
        
    }

}
