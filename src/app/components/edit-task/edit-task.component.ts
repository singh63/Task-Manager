import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})

export class EditTaskComponent implements OnInit 
{
  taskForm: FormGroup; // Form group for reactive form
  id!: number; // Holds the task ID

  constructor(
    private fb: FormBuilder, // For building the form
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {
    // Initialize the reactive form with validation rules
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)], Validators.maxLength(100)],
    });
  }

  ngOnInit(): void {
    // Parse the ID from the route parameters
    this.id = parseInt(this.route.snapshot.params['id'], 10);

    // Fetch the task by ID
    const task = this.taskService.getTaskbyId(this.id);
    if (task) {
      // Populate the form with task data
      this.taskForm.patchValue(task);
    }
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      // Extract form values
      const { title, description } = this.taskForm.value;

      // Call the service to update the task
      this.taskService.editTask(this.id, title, description);

      // Redirect to the task list
      this.router.navigate(['/tasks']);
    }
  }
}
