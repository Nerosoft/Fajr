import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Suppliers } from './Suppliers';


@Injectable({
  providedIn: 'root'
})
export class SuppliersServes {
    private dbPath = 'diploma/Suppliers';
    suppliersRef: AngularFireList<Suppliers> = null;
    constructor(private db: AngularFireDatabase) {
        this.suppliersRef = db.list(this.dbPath);
      }


      createSuppliers(suppliers: Suppliers): void {
        this.suppliersRef.push(suppliers);
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