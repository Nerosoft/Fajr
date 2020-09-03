import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { LoginComponent } from '../login/login.component';
import { Branch } from './Branch';

@Injectable({
  providedIn: 'root'
})

export class BranchServes {
    private dbPath = 'diploma/branch';
    dbf=null
    branchsRef: AngularFireList<Branch> = null;
    constructor(private db: AngularFireDatabase) {
        this.dbf=db
        // this.clientsRef = db.list(this.dbPath);
      }

      setupAngularFireList(){
        this.branchsRef = this.dbf.list('diploma/aplication/'+LoginComponent.USERNAME+'/branch');
      }
      createBranch(Branch: Branch): void {
        this.branchsRef.push(this.filtterData(Branch));
      }
      filtterData(Branch: Branch){
        Branch.stbranchName=null
        Branch.stname=null
        Branch.stpass=null
        Branch.stphone=null
        Branch.staddress=null
        return Branch
      }
      updateF(key: string, value: any): Promise<void> {
        return this.branchsRef.update(key, value);
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