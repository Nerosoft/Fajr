import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Suppliers } from './Suppliers';
import { LoginComponent } from '../login/login.component';


@Injectable({
  providedIn: 'root'
})
export class SuppliersServes {
  dbf = null
  suppliersRef: AngularFireList<Suppliers> = null;
  constructor(private db: AngularFireDatabase) {
    this.dbf = db
  }
  setupAngularFireList() {
    this.suppliersRef = this.dbf.list('diploma/aplication/' + LoginComponent.USERNAME + '/Suppliers');
  }
  createSuppliers(suppliers: Suppliers): void {
    this.suppliersRef.push(this.filtterData(suppliers));
  }
  filtterData(suppliers: Suppliers) {
    suppliers.stname = null
    suppliers.stnumber = null
    suppliers.stphone = null
    suppliers.staddress = null
    return suppliers
  }
  updateF(key: string, value: any): Promise<void> {
    return this.suppliersRef.update(key, value);
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