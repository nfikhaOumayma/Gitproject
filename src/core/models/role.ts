
export class Role {
    id!: number;
    roleName!: RoleUser;
  }
  
  export enum RoleUser {
    ADMIN = 'ADMIN',
    EMPLOYEE = 'EMPLOYEE',
    ENTREPRISE = 'Entreprise',
    UTILISATEUR = 'Utilisateur',
    ENSEIGNANT = 'enseignant',
    ETUDIANT = 'etudiant',
  }