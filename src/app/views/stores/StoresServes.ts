import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Stores } from './Stores';

@Injectable({
  providedIn: 'root'
})
export class StoresServes {
    private dbPath = 'diploma/Stores';
    storesRef: AngularFireList<Stores> = null;
    constructor(private db: AngularFireDatabase) {
        this.storesRef = db.list(this.dbPath);
      }


      createStore(stores: Stores): void {
        this.storesRef.push(stores);
      }
     
      updateF(key: string, value: any): Promise<void> {
        return this.storesRef.update(key, value);
      }
     
      deleteF(key: string): Promise<void> {
        return this.storesRef.remove(key);
      }
     
      getStoresList(): AngularFireList<Stores> {
        return this.storesRef;
      }
     
      deleteAll(): Promise<void> {
        return this.storesRef.remove();
      }

}
