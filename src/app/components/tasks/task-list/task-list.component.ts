import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/interfaces/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;

  newTask = {
    title: '',
    description: '',
    deadline: '',
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  addTask(): void {
    if (!this.newTask.title) return;

    this.taskService.createTask(this.newTask).subscribe({
      next: (task) => {
        this.tasks.unshift(task);
        this.newTask = { title: '', description: '', deadline: '' };
      },
    });
  }

  toggleStatus(task: Task): void {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';

    this.taskService.updateTask(task._id, { status: newStatus }).subscribe({
      next: (updated) => (task.status = updated.status),
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t._id !== id);
      },
    });
  }
}
