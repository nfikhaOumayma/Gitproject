import { Role } from "./role";


export class UserPrinciple {
  id!: number;
  name!: string;
  username!: string;
  email!: string;
  password!: string; 
  isVerified!: boolean;
  authorities!: Role[];

}