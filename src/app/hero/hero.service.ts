import { Lang } from './../views/interfaces';
import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/internal/Subscription';


@Injectable({ providedIn: 'root' })
export class HeroService {
  public get translate(): TranslateService {
    return this._translate;
  }
  langCompo: Lang;
  RIGHTTOLIFT = true;
  lang: any = {};
  subscriptionLang: Subscription;
  constructor(private _translate: TranslateService) {
    this.translate.getTranslation(this.currentLang()).subscribe((lang) => {
      this.lang = lang;
    });

    this.subscriptionLang = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.lang = event.translations;
        this.langCompo.setupLang(this.lang);
      }
    );
  }

  setupLanguage(langCompo: Lang) {
    this.langCompo = langCompo;
    this.langCompo.setupLang(this.lang);
  }

  clients: any[] = new Array();
  categorys: any[] = new Array();
  suppliers: any[] = new Array();
  stores: any[] = new Array();
  input: any[] = new Array();
  out: any[] = new Array();
  Branch: any[] = new Array();

  currentLang() {
    return this.translate.currentLang || this.translate.defaultLang;
  }
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
