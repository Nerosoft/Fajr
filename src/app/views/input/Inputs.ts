import { InputAndOut } from "src/app/hero/InputAndOut";
import { HeroService } from 'src/app/hero/hero.service';

export class Inputs extends InputAndOut{

    public number: number;
    public date: string;
    public thesupplier: string;
    public thestore:string;
    public thesuppliers=[];
    public thestores=[];
    public key

    public stnumber=false;
    public stdate=false;
    public stthesupplier=false;
    public stthestore=false;
  
  
  
    constructor() { 
      super()
      this.getStores();
      this.getSuppliers();
      this.getItems();
      this.getTotal()
    }
    
  
  
    getItems(){
      HeroService.categorys.forEach(element => {
        this.items.push(element.name)
      });
    }
    getTotal() {
      return this.quantity*this.salary; 
    }
  
    public setInput(value:Inputs){
      HeroService.input.push(value);
    }
  
    public getStores(){
      HeroService.stores.forEach(element => {
        this.thestores.push(element.name)
      });
      return this.thestores;
    }
  
    public getSuppliers(){
      HeroService.suppliers.forEach(element => {
        this.thesuppliers.push(element.name)
      });
      return this.thesuppliers;
    }
  
    public validateInput(){
      let state=true;
      if(!Number.isInteger(this.number)){
        state=false;
       this.stnumber=true;
      }else this.stnumber=false;
  
      if(this.date==undefined||this.date.length<7){
        state=false;
        this.stdate=true;
      }else  this.stdate=false;
  
      if(this.thesupplier==undefined||this.thesupplier.trim()==""){
        state=false;
        this.stthesupplier=true;
      }else  this.stthesupplier=false;
  
      if(this.thestore==undefined||this.thestore.trim()==""){
        state=false;
        this.stthestore=true;
      }else  this.stthestore=false;
     
      return state;
    }
    static setInput(){
      return new Inputs();
    }
  }