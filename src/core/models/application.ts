import { LogEntry } from "./log-entry";
import { Task } from "./task";

export class Application {
    id!: number;
    name!: string;
    clientId!: string;
    logs!: LogEntry[];
    tasks!: Task[];
  }