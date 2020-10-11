import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Login } from './Logins';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LoginServes {
  private dbPath = 'diploma/';
  usersRef: AngularFireList<Login> = null;
  dbf: AngularFireDatabase = null;
  constructor(private db: AngularFireDatabase) {
    this.dbf = db;
    this.usersRef = db.list(this.dbPath + '/users');
  }
  createUser(user: Login, callback): void {
    this.usersRef.push(this.filtterData(user)).then(callback);
  }
  filtterData(user: Login) {
    delete user.stuserName;
    delete user.stcompanyName;
    delete user.staliasName;
    delete user.stpass;
    delete user.stforgitKey;
    return user;
  }
  updateUser(key: string, value: any): Promise<void> {
    return this.usersRef.update(key, this.filtterData(value));
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
  getDatabase(dbPath) {
    return this.dbf.object(dbPath).valueChanges();
  }
}
