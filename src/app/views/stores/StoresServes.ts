import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Stores } from './Stores';
import { LoginComponent } from '../login/login.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoresServes {
  dbf = null;
  storesRef: AngularFireList<Stores> = null;
  constructor(private db: AngularFireDatabase) {
    this.dbf = db;
  }
  setupAngularFireList() {
    this.storesRef = this.dbf.list(
      'diploma/aplication/' + environment.systemConfig.linkdata + '/Stores'
    );
  }
  createStore(stores: Stores, callback): void {
    this.storesRef.push(this.filtterData(stores)).then(callback);
  }
  filtterData(stores: Stores) {
    delete stores.stnumber;
    delete stores.stname;
    delete stores.ststorekeeper;
    return stores;
  }
  updateF(key: string, value: any): Promise<void> {
    return this.storesRef.update(key, this.filtterData(value));
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
