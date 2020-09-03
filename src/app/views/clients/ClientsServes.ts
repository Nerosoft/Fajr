import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Clients } from './Clients';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class ClientsServes {
    private dbPath = 'diploma/Clients';
    dbf=null
    clientsRef: AngularFireList<Clients> = null;
    constructor(private db: AngularFireDatabase) {
        this.dbf=db
      }

      //الذهاب الي مسار الجدول في قاعدة بيانات الفير بيز
      setupAngularFireList(){
        this.clientsRef = this.dbf.list('diploma/aplication/'+LoginComponent.USERNAME+'/Clients');
      }
       /*
        نقوم بأنشاء وادخال بيانات في الجدول في قاعدة بيانات الفير بيز
        ولو تلاحظ بستقبل متغير واحد من نوع البيانات ال سيتم ادخالها في الجدول
       */
      createClient(Client: Clients): void {
        this.clientsRef.push(this.filtterData(Client));
      }
      
      filtterData(Client: Clients){
        Client.stname=null
        Client.stnumber=null
        Client.stphone=null
        Client.staddress=null
        return Client
      }

      /*
        هنا يتم عمل تعديل علي عنصر معين في الجدول في قاعدة بيانات الفير بيز
        ولو تلاحظ هتلاقي بستقبل اثنين متغيرين في الداله
        الاول المفتاح عشان اعرف اطابق العنصر المراد تعديله
        الثاني القيمة الجديده التي ستحل مكان القديمة
       */
      updateF(key: string, value: any): Promise<void> {
        return this.clientsRef.update(key, value);
      }
      /*
        هنا يتم عمل حذف  عنصر معين في الجدول في قاعدة بيانات الفير بيز
        ولو تلاحظ هتلاقي بستقبل متغير في الداله
       المفتاح عشان اعرف اطابق العنصر المراد حذفه من الجدول
       */

      deleteF(key: string): Promise<void> {
        return this.clientsRef.remove(key);
      }
     // هنا يتم جلب جمع البينات من الجدول لعرضها للمستخدم في الموقع
      getClientsList(): AngularFireList<Clients> {
        return this.clientsRef;
      }
     // هنا يتم مسح جميع البيانات التي في الجدول
      deleteAll(): Promise<void> {
        return this.clientsRef.remove();
      }

}