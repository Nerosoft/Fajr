import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class HeroService {
  constructor() {}
  clients: any[] = new Array();
  categorys: any[] = new Array();
  suppliers: any[] = new Array();
  stores: any[] = new Array();
  input: any[] = new Array();
  out: any[] = new Array();
  Branch: any[] = new Array();



  message = {
    success: {
      plus: 'تمت العمليه بنجاح',
      signIn: 'تم تسجيل الدخول بنجاح',
      signUp: 'تم تسجيل اشتراك بنجاح',
      changPass: 'تم تغير كلمة المرور',
    },
    error: {
      err: 'من فضلك حاول من جديد',
      login: 'حدث مشكله اثناء الاتصال',
      errII: 'هناك شئ لا يبدو جيدا',
    },
  };

  err = {
    Categorys: {
      number: 'تأكد من الرقم',
      name: 'تأكد من الاسم',
      salary: 'تأكد من السعر',
      countrie: 'تأكد من الدوله',
    },
    Clients: {
      number: 'تأكد من الرقم',
      name: 'تأكد من الاسم',
      phone: 'تأكد من الهاتف',
      address: 'تأكد من العنوان',
    },
    Suppliers: {
      number: 'تأكد من الرقم',
      name: 'تأكد من الاسم',
      phone: 'تأكد من الهاتف',
      address: 'تأكد من العنوان',
    },
    Stores: {
      number: 'تأكد من الرقم',
      name: 'تأكد من الاسم',
      storekeeper: 'تأكد من اسم الامين',
    },
    Input: {
      number: 'تأكد من الرقم',
      date: 'تأكد من التاريخ',
      thesupplier: 'تأكد من المورد',
      thestore: 'تأكد من المخزن',
    },
    Out: {
      number: 'تأكد من الرقم',
      date: 'تأكد من التاريخ',
      theclient: 'تأكد من العميل',
    },
    Login: {
      userName: 'تأكد من اسم المستخدم',
      pass: 'تأكد من كلمة المرور',
      companyName: 'تأكد من اسم الشركه',
      aliasName: 'تأكد من الاسم المستعار',
      forgitKey: 'تأكد من رمز تذكر الحساب',
    },

    Branch: {
      branch: 'تأكد من اسم الفرع',
      name: 'تأكد من الاسم',
      pass: 'تأكد من كلمة المرور',

      phone: 'تأكد من الهاتف',
      address: 'تأكد من العنوان',
    },
  };
}

// static err={
//   Categorys:{
//     number:'error number',name:'error name',salary:'error salary',countrie:'error countrie'
//   },
//   Clients:{
//     number:'error number',name:'error name',phone:'error phone',address:'error address'
//   },
//   Suppliers:{
//     number:'error number',name:'error name',phone:'error phone',address:'error address'
//   },
//   Stores:{
//     number:'error number',name:'error name',storekeeper:'error Storekeeper'
//   },
//   Input:{
//     number:'error number',date:'error date',thesupplier:'error the supplier',thestore:'error the store'
//   },
//   Out:{
//     number:'error number',date:'error date',theclient:'error the clients'
//   },
//   Login:{userName:'error user name',pass:'error password'},
//   Branch:{branch:'error branch',name:'error name',pass:'error password',
//   phone:'error phone',address:'error address'}
// };

// static err={
//   Categorys:{
//     number:'تأكد من الرقم',name:'تأكد من الاسم',salary:'تأكد من السعر',countrie:'تأكد من الدوله'
//   },
//   Clients:{
//     number:'تأكد من الرقم',name:'تأكد من الاسم',phone:'تأكد من الهاتف',address:'تأكد من العنوان'
//   },
//   Suppliers:{
//     number:'تأكد من الرقم',name:'تأكد من الاسم',phone:'تأكد من الهاتف',address:'تأكد من العنوان'
//   },
//   Stores:{
//     number:'تأكد من الرقم',name:'تأكد من الاسم',storekeeper:'تأكد من اسم الامين'
//   },
//   Input:{
//     number:'تأكد من الرقم',date:'تأكد من التاريخ',thesupplier:'تأكد من المورد',thestore:'تأكد من المخزن'
//   },
//   Out:{
//     number:'تأكد من الرقم',date:'تأكد من التاريخ',theclient:'تأكد من العميل'
//   },
//   Login:{userName:'تأكد من اسم المستخدم',pass:'تأكد من كلمة المرور'},

//   Branch:{branch:'تأكد من اسم الفرع',name:'تأكد من الاسم',pass:'تأكد من كلمة المرور',

//   phone:'تأكد من الهاتف',address:'تأكد من العنوان'}
// };
