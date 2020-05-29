import { Injectable, Input } from '@angular/core';


import { map } from 'rxjs/operators';
import { HttpHeaders , HttpClient } from '@angular/common/http';



@Injectable()
export class HeroService {
  static clients:any[]=new Array();
  static categorys:any[]=new Array();
  static suppliers:any[]=new Array();
  static stores:any[]=new Array();
  static input:any[]=new Array();
  static out:any[]=new Array();
  static USERNAME="";
  static nvCategorysServes:any//fire

  constructor(public http:HttpClient ) {

   
   }
   public getUrl():String{
    return "";
   }


  //  servPost(url:string,user){
  //    let headers=new Headers();
  //    headers.append('Content-type','application/json');
  //    return  this.http
  //    .post(url,user,{headers:headers}).map(res=>res.json());
  //  }
 
   servGet(url:string,callback,that){
    let smartphone: any = [];
     let headers=new HttpHeaders();
     headers.append('Content-type','application/json');
     return  this.http
     .get(url,{headers:headers}).pipe(map(data => {
      callback(data,that)
       
     })).subscribe(data => data);

  //  servGet(url:string){
  //   let headers=new HttpHeaders();
  //   headers.append('Content-type','application/json');
  //   return  this.http
  //   .get(url).pipe(map(data => {})).subscribe(result => {
  //     console.log(result);
  //  });
  // }
  
}

















  
  static err={
    Categorys:{
      number:'error number',name:'error name',salary:'error salary',countrie:'error countrie'
    },
    Clients:{
      number:'error number',name:'error name',phone:'error phone',address:'error address'
    },
    Suppliers:{
      number:'error number',name:'error name',phone:'error phone',address:'error address'
    },
    Stores:{
      number:'error number',name:'error name',ststorekeeper:'error Storekeeper'
    }, 
    Input:{
      number:'error number',date:'error date',thesupplier:'error the supplier',thestore:'error the store'
    },
    Out:{
      number:'error number',date:'error date',theclient:'error the clients'
    },
    Login:{stuserName:'error user name',stpass:'error password'}
  };
}


/*


      <section class="tools">
        <div class="container">
            <hr> 
            <i class="fas fa-question" (click)="qus()"></i>
            <i class="fas fa-arrow-up" 
            [ngClass]="{'active' : ngbnv2}" 
            (click)="setnav(2)"></i>
            <i class="fas fa-arrow-down"
            [ngClass]="{'active' : ngbnv1}" 
            (click)="setnav(1)"></i>
            <!-- <i class="fas fa-edit"></i> -->
            <i class="fas fa-minus-circle" (click)="open()"></i>
            <!-- <i class="fas fa-plus-circle"></i>
            <i class="fas fa-print"></i> -->
            <i class="fas fa-plus-circle"
                (click)="savaDAtaBase([dangerstnumber,dangerstname,dangerstphone,dangerstaddress])"></i>
            <hr>
        </div>
    </section>


 public activeId=1;
 public ngbnv1=true;
 public ngbnv2=false;


  setnav(vn){
    this.activeId=vn;
    if(vn==1) {
      this.ngbnv1=true;
      this.ngbnv2=false;
    }
    else if(vn==2) {
      this.ngbnv2=true;
      this.ngbnv1=false;
    }
    
  }



*/














