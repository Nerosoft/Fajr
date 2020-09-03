import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Login } from './Logins';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export  class LoginServes {
 
    private dbPath = 'diploma/';
   
    usersRef: AngularFireList<Login> = null;
    dbf:AngularFireDatabase=null
    constructor(private db: AngularFireDatabase) {
      this.dbf=db
      this.usersRef = db.list(this.dbPath+"/users");
    }
   
    createUser(user: Login): void {
      this.usersRef.push(this.filtterData(user));
    }
    filtterData(user: Login){
      user.stuserName=null
      user.stcompanyName=null
      user.staliasName=null
      user.stpass=null
      user.stforgitKey=null
      return user
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
    getDatabase(dbPath){
      return this.dbf.object(dbPath).valueChanges()
    }
  }
  