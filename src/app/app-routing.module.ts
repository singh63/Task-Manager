import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';


const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }, // Redirect to task list
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: AddTaskComponent },
  { path: 'tasks/:id/edit', component: EditTaskComponent },
  { path: '**', redirectTo: '/tasks' }, // Wildcard for invalid paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
