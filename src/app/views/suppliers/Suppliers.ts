import { HeroService } from "src/app/hero/hero.service";

export class Suppliers {

    public number: number;
    public name: string;
    public phone: string;
    public address: string;
    public key
  
    public stnumber=false;
    public stname=false;
    public stphone=false;
    public staddress=false;
    constructor() { }
  
    public setSuppliersComponent(value:Suppliers){
      HeroService.suppliers.push(value);
    }
  
  
    public validateInput(){
      let state=true;
      if(!Number.isInteger(this.number)){
        state=false;
       this.stnumber=true;
      }else this.stnumber=false;
  
      if(this.name==undefined||this.name.length<7){
        state=false;
        this.stname=true;
      }else  this.stname=false;
  
      if(this.phone==undefined||this.phone.toString().length!=10){
        state=false;
        this.stphone=true;
      }else this.stphone=false;
  
      if(this.address==undefined||this.address.trim()==""){
        state=false;
        this.staddress=true;
      }else  this.staddress=false;
  
      return state;
    }

    static setSuppliers(){
      return new Suppliers();
    }
  }
  