import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Outs } from './Outs';

@Injectable({
  providedIn: 'root'
})
export class OutServes {
    private dbPath = 'diploma/Outs';
    outssRef: AngularFireList<Outs> = null;
    constructor(private db: AngularFireDatabase) {
        this.outssRef = db.list(this.dbPath);
      }


      createOut(out: Outs): void {
        this.outssRef.push(out);
      }
     
      updateF(key: string, value: any): Promise<void> {
        return this.outssRef.update(key, value);
      }
     
      deleteF(key: string): Promise<void> {
        return this.outssRef.remove(key);
      }
     
      getOutsList(): AngularFireList<Outs> {
        return this.outssRef;
      }
     
      deleteAll(): Promise<void> {
        return this.outssRef.remove();
      }

}
