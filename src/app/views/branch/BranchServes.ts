import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

import { LoginComponent } from '../login/login.component';
import { Branch } from './Branch';

@Injectable({
  providedIn: 'root',
})
export class BranchServes {
  dbf = null;
  branchsRef: AngularFireList<Branch> = null;
  constructor(private db: AngularFireDatabase) {
    this.dbf = db;
  }
  setupAngularFireList() {
    this.branchsRef = this.dbf.list(
      'diploma/aplication/' + environment.systemConfig.linkdata + '/branch'
    );
  }
  createBranch(Branch, callback): void {
    this.branchsRef.push(this.filtterData(Branch)).then(callback);
  }
  filtterData(Branch: Branch) {
    delete Branch.stbranchName;
    delete Branch.stname;
    delete Branch.stpass;
    delete Branch.stphone;
    delete Branch.staddress;
    return Branch;
  }
  updateF(key: string, value: any): Promise<void> {
    return this.branchsRef.update(key, this.filtterData(value));
  }
  deleteF(key: string): Promise<void> {
    return this.branchsRef.remove(key);
  }
  getBranchsList(): AngularFireList<Branch> {
    return this.branchsRef;
  }
  deleteAll(): Promise<void> {
    return this.branchsRef.remove();
  }
}
