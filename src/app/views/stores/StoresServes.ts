import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Stores } from './Stores';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class StoresServes {
    private dbPath = 'diploma/Stores';
    dbf=null
    storesRef: AngularFireList<Stores> = null;
    constructor(private db: AngularFireDatabase) {
      this.dbf=db
        //this.storesRef = db.list(this.dbPath);
      }
      setupAngularFireList(){
        this.storesRef = this.dbf.list('diploma/aplication/'+LoginComponent.USERNAME+'/Stores');
      }

      createStore(stores: Stores): void {
        this.storesRef.push(this.filtterData(stores));
      }
      filtterData(stores: Stores){
        stores.stnumber=null
        stores.stname=null
        stores.ststorekeeper=null
        return stores
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
