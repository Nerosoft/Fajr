import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Categorys } from './Categorys';

@Injectable({
  providedIn: 'root'
})
export class CategorysServes {
    private dbPath = 'diploma/Categorys';
    categorysRef: AngularFireList<Categorys> = null;
    constructor(private db: AngularFireDatabase) {
        this.categorysRef = db.list(this.dbPath);
      }


      createCategory(category: Categorys): void {
        this.categorysRef.push(category);
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
