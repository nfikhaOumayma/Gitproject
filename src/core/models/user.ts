import { Role } from "./role";
import { Task } from "./task";

export class User {
    id!: number;
    name!: string;
    username!: string;
    email!: string;
    password!: string;
    address!: string;
    number!: number;
    blocked!: boolean;
    valid!: boolean;
    token!: string;
    image!: string;
    tasks!: Task[];
    roles!: Role[];
  }