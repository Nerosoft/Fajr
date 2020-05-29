import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Login } from './Logins';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export  class LoginServes {
 
    private dbPath = 'diploma/users';
   
    usersRef: AngularFireList<Login> = null;
 
    constructor(private db: AngularFireDatabase) {
      this.usersRef = db.list(this.dbPath);
    }
   
    createUser(user: Login): void {
      this.usersRef.push(user);
    }
   
    updateUser(key: string, value: any): Promise<void> {
      return this.usersRef.update(key, value);
    }
   
    deleteCustomer(key: string): Promise<void> {
      return this.usersRef.remove(key);
    }
   
    getUsersList(): AngularFireList<Login> {
      return this.usersRef;
    }
   
    deleteAll(): Promise<void> {
      return this.usersRef.remove();
    }
  }
  