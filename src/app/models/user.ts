export class User {
  [x: string]: boolean; // CHECK THIS ABDESSALAM
    _id?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    token?: string;
    userId?:string;
    isAdmin?: boolean;
}
