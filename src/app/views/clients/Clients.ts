import { HeroService } from "src/app/hero/hero.service";

export class Clients {

    public number: number; //  حقل اسمه ونوعه
    public name: string; //  حقل اسمه ونوعه
    public phone: string; //  حقل اسمه ونوعه
    public address: string; //  حقل اسمه ونوعه
    public key //  حقل اسمه ونوعه وهو لا يتكرر



    public stnumber=false;  // خاص بالفحص
    public stname=false;// خاص بالفحص
    public stphone=false;// خاص بالفحص
    public staddress=false;// خاص بالفحص
    
    constructor() { }
  
    public setClients(value:Clients){
      HeroService.clients.push(value);
    }
  
    // هنا يتم عمل فحص للبيانات الحقول قبل ارسالها وتخذنها في القعده
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

    static setClients(){
      return new Clients();
    }
    

  }
  