import { Application } from "./application";

export class LogEntry {
    id!: number;
    message!: string;
    timestamp!: Date;
    application!: Application;
  }