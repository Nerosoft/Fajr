import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Outs } from './Outs';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class OutServes {
    dbf=null
    outssRef: AngularFireList<Outs> = null;
    constructor(private db: AngularFireDatabase) {
      this.dbf=db 
      }
      setupAngularFireList(){
        this.outssRef = this.dbf.list('diploma/aplication/'+LoginComponent.USERNAME+'/Outs');
      }
      createOut(out: Outs): void {
        this.outssRef.push(this.filtterData(out));
      }
      filtterData(out: Outs){
        out.items=null
        out.total=null
        out.theclients=null
        out.salaryOfItem=null
        out.stnumber=null
        out.stdate=null
        out.sttheclient=null
        return out
      }
      updateF(key: string, value: any): Promise<void> {
        return this.outssRef.update(key, value);
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
