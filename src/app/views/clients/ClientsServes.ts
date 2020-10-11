import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Clients } from './Clients';
import { LoginComponent } from '../login/login.component';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ClientsServes {
  dbf = null;
  clientsRef: AngularFireList<Clients> = null;
  constructor(private db: AngularFireDatabase) {
    this.dbf = db;
  }
  setupAngularFireList() {
    this.clientsRef = this.dbf.list(
      'diploma/aplication/' + environment.systemConfig.linkdata + '/Clients'
    );
  }
  createClient(Client: Clients, callback): void {
    this.clientsRef.push(this.filtterData(Client)).then(callback);
  }
  updateF(key: string, value: any): Promise<void> {
    return this.clientsRef.update(key, this.filtterData(value));
  }
  deleteF(key: string): Promise<void> {
    return this.clientsRef.remove(key);
  }
  getClientsList(): AngularFireList<Clients> {
    return this.clientsRef;
  }
  deleteAll(): Promise<void> {
    return this.clientsRef.remove();
  }
  filtterData(Client: Clients) {
    delete Client.stname;
    delete Client.stnumber;
    delete Client.stphone;
    delete Client.staddress;
    return Client;
  }
}
