import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Clients } from './Clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsServes {
    private dbPath = 'diploma/Clients';
    clientsRef: AngularFireList<Clients> = null;
    constructor(private db: AngularFireDatabase) {
        this.clientsRef = db.list(this.dbPath);
      }


      createClient(category: Clients): void {
        this.clientsRef.push(category);
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

}