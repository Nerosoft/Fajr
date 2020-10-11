import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Suppliers } from './Suppliers';
import { LoginComponent } from '../login/login.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SuppliersServes {
  dbf = null;
  suppliersRef: AngularFireList<Suppliers> = null;
  constructor(private db: AngularFireDatabase) {
    this.dbf = db;
  }
  setupAngularFireList() {
    this.suppliersRef = this.dbf.list(
      'diploma/aplication/' + environment.systemConfig.linkdata + '/Suppliers'
    );
  }
  createSuppliers(suppliers: Suppliers, callback): void {
    this.suppliersRef.push(this.filtterData(suppliers)).then(callback);
  }
  filtterData(suppliers: Suppliers) {
    delete suppliers.stname;
    delete suppliers.stnumber;
    delete suppliers.stphone;
    delete suppliers.staddress;
    return suppliers;
  }
  updateF(key: string, value: any): Promise<void> {
    return this.suppliersRef.update(key, this.filtterData(value));
  }
  deleteF(key: string): Promise<void> {
    return this.suppliersRef.remove(key);
  }
  getSuppliersList(): AngularFireList<Suppliers> {
    return this.suppliersRef;
  }
  deleteAll(): Promise<void> {
    return this.suppliersRef.remove();
  }
}
