import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Inputs } from './Inputs';
import { LoginComponent } from '../login/login.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InputServes {
  dbf = null;
  inputssRef: AngularFireList<Inputs> = null;
  constructor(private db: AngularFireDatabase) {
    this.dbf = db;
  }
  setupAngularFireList() {
    this.inputssRef = this.dbf.list(
      'diploma/aplication/' + environment.systemConfig.linkdata + '/Inputs'
    );
  }
  createInput(inputs: Inputs, callback): void {
    this.inputssRef.push(this.filtterData(inputs)).then(callback);
  }
  filtterData(inputs: Inputs) {
    delete inputs.total;
    delete inputs.thesuppliers;
    delete inputs.thestores;
    delete inputs.stnumber;
    delete inputs.stdate;
    delete inputs.stthesupplier;
    delete inputs.stthestore;
    return inputs;
  }
  updateF(key: string, value: any): Promise<void> {
    return this.inputssRef.update(key, this.filtterData(value));
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
