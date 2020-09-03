import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Inputs } from './Inputs';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class InputServes {
    private dbPath = 'diploma/Inputs';
    dbf=null
    inputssRef: AngularFireList<Inputs> = null;
    constructor(private db: AngularFireDatabase) {
      this.dbf=db;
        // this.inputssRef = db.list(this.dbPath);
      }

      setupAngularFireList(){
        this.inputssRef = this.dbf.list('diploma/aplication/'+LoginComponent.USERNAME+'/Inputs');
      }
      createInput(inputs: Inputs): void {
        this.inputssRef.push(this.filtterData(inputs));
      }
      filtterData(inputs: Inputs){
        inputs.items=null
        inputs.total=null
        inputs.thesuppliers=null;
        inputs.thestores=null;
        inputs.stnumber=null
        inputs.stdate=null
        inputs.stthesupplier=null
        inputs.stthestore=null
        return inputs
      }
      updateF(key: string, value: any): Promise<void> {
        return this.inputssRef.update(key, value);
      }
     
      deleteF(key: string): Promise<void> {
        return this.inputssRef.remove(key);
      }
     
      getInputsList(): AngularFireList<Inputs> {
        return this.inputssRef;
      }
     
      deleteAll(): Promise<void> {
        return this.inputssRef.remove();
      }

}
