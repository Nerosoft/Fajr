import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Outs } from './Outs';
import { LoginComponent } from '../login/login.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OutServes {
  dbf = null;
  outssRef: AngularFireList<Outs> = null;
  constructor(private db: AngularFireDatabase) {
    this.dbf = db;
  }
  setupAngularFireList() {
    this.outssRef = this.dbf.list(
      'diploma/aplication/' + environment.systemConfig.linkdata + '/Outs'
    );
  }
  createOut(out: Outs, callback): void {
    this.outssRef.push(this.filtterData(out)).then(callback);
  }
  filtterData(out: Outs) {
    delete out.total;
    delete out.stnumber;
    delete out.stdate;
    delete out.sttheclient;
    return out;
  }
  updateF(key: string, value: any): Promise<void> {
    return this.outssRef.update(key, this.filtterData(value));
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
