import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Categorys } from './Categorys';
import { Login } from '../login/Logins';
import { LoginComponent } from '../login/login.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategorysServes {
  dbf = null;
  categorysRef: AngularFireList<Categorys> = null;
  constructor(private db: AngularFireDatabase) {
    this.dbf = db;
  }
  setupAngularFireList() {
    this.categorysRef = this.dbf.list(
      'diploma/aplication/' + environment.systemConfig.linkdata + '/Categorys'
    );
  }
  createCategory(category: Categorys, callback): void {
    this.categorysRef.push(this.filtterData(category)).then(callback);
  }
  filtterData(category: Categorys) {
    delete category.stname;
    delete category.stnumber;
    delete category.stsalary;
    delete category.stcountrie;
    delete category.editCounts;
    return category;
  }
  updateF(key: string, value: any): Promise<void> {
    return this.categorysRef.update(key, this.filtterData(value));
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
