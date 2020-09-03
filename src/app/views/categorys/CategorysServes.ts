import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Categorys } from './Categorys';
import { Login } from '../login/Logins';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class CategorysServes {
    private dbPath = 'diploma/Categorys';
    dbf=null
    categorysRef: AngularFireList<Categorys> = null;
    constructor(private db: AngularFireDatabase) {
        this.dbf=db
        //this.categorysRef = this.dbf.list(this.dbPath);
      }



      setupAngularFireList(){
        this.categorysRef = this.dbf.list('diploma/aplication/'+LoginComponent.USERNAME+'/Categorys');
      }
      createCategory(category: Categorys): void {
        this.categorysRef.push(this.filtterData(category));
      }
      filtterData(category: Categorys){
        category.stname=null
        category.stnumber=null
        category.stsalary=null
        category.stcountrie=null
        return category
      }

      updateF(key: string, value: any): Promise<void> {
        return this.categorysRef.update(key, value);
      }
     
      deleteF(key: string): Promise<void> {
        return this.categorysRef.remove(key);
      }
     
      getCategorysList(): AngularFireList<Categorys> {
        return this.categorysRef;
      }
     
      deleteAll(): Promise<void> {
        return this.categorysRef.remove();
      }



}
