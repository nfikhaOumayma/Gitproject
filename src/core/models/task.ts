import { Application } from "./application";
import { User } from "./user";

export class Task {
    id!: number;
    taskName!: string;
    schedule!: string;
    status!: string;
    lastRunTime!: Date;
    user!: User;
    application!: Application;
  }