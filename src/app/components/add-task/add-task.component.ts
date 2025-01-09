import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-add-task',
  imports: [ MatCardModule, MatChipsModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    CommonModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTaskComponent  implements OnInit
{

    taskForm: FormGroup;



    constructor(private fb: FormBuilder,private taskService: TaskService, 
      private router: Router)
      {
          this.taskForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            description: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
          });

      }

      ngOnInit(): void{}

    addTask(): void
    {
      if(this.taskForm.valid)
      {
        const newTask = {
          title: this.taskForm.value.title, 
          description: this.taskForm.value.description};

        this.taskService.addTask(newTask);
        this.router.navigate(['./tasks']);
      }
     
    }

}
