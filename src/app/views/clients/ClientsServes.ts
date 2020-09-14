import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Clients } from './Clients';
import { LoginComponent } from '../login/login.component';
@Injectable({
  providedIn: 'root'
})
export class ClientsServes {
  dbf = null
  clientsRef: AngularFireList<Clients> = null;
  constructor(private db: AngularFireDatabase) {
    this.dbf = db
  }
  setupAngularFireList() {
    this.clientsRef = this.dbf.list('diploma/aplication/' + LoginComponent.USERNAME + '/Clients');
  }
  createClient(Client: Clients): void {
    this.clientsRef.push(this.filtterData(Client));
  }
  updateF(key: string, value: any): Promise<void> {
    return this.clientsRef.update(key, value);
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
    Client.stname = null
    Client.stnumber = null
    Client.stphone = null
    Client.staddress = null
    return Client
  }
}