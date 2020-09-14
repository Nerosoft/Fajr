import { InputAndOut } from 'src/app/hero/InputAndOut';
import { HeroService } from 'src/app/hero/hero.service';

export class Outs extends InputAndOut{

    public number: number;
    public date: string;
    public key;
    public theclient: string;
  

    public theclients=[];
    public salaryOfItem=[]

    public stnumber=false;
    public stdate=false;
    public sttheclient=false;
  
    constructor() { 
      super()
      this.getItems()
      this.getTotal()
      this.getclient()
    }
    
  
  
    getItems(){
      HeroService.categorys.forEach(element => {
        this.items.push(element.name)
        this.salaryOfItem.push(element.salary)
      });
    }
    getTotal() {
      return this.quantity*this.salary; 
    }
  
    public getclient(){
      HeroService.clients.forEach(element => {
        this.theclients.push(element.name)
      });
      return this.theclients;
    }
  
    public setInput(value:Outs){
      HeroService.out.push(value);
    }
  
    public validateInput(){
      let state=true;
      if(!Number.isInteger(this.number)){
        state=false;
       this.stnumber=true;
      }else this.stnumber=false;
  
      if(this.date==undefined||this.date.length<5){
        state=false;
        this.stdate=true;
      }else  this.stdate=false;
  
      if(this.theclient==undefined||this.theclient.trim()==""){
        state=false;
        this.sttheclient=true;
      }else  this.sttheclient=false;
  
      return state;
    }
    static setOut(){
      return new Outs();
    }
  }
  