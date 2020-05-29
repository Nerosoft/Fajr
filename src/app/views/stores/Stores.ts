import { HeroService } from 'src/app/hero/hero.service';

export class Stores {

    public number: number;
    public name: string;
    public storekeeper: string;
    public key
  
    public stnumber=false;
    public stname=false;
    public ststorekeeper=false;
  
    constructor() { }
  
    public setStores(value:Stores){
      HeroService.stores.push(value);
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
  
      if(this.storekeeper==undefined||this.storekeeper.length<7){
        state=false;
        this.ststorekeeper=true;
      }else  this.ststorekeeper=false;
  
      return state;
    }

    static setStores(){
      return new Stores();
    }
  }
  