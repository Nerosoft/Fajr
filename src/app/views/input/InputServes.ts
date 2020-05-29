import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Inputs } from './Inputs';

@Injectable({
  providedIn: 'root'
})
export class InputServes {
    private dbPath = 'diploma/Inputs';
    inputssRef: AngularFireList<Inputs> = null;
    constructor(private db: AngularFireDatabase) {
        this.inputssRef = db.list(this.dbPath);
      }


      createInput(inputs: Inputs): void {
        this.inputssRef.push(inputs);
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
