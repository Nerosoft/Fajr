import { HeroService } from 'src/app/hero/hero.service';

export class Clients {
  public number: number;
  public name: string;
  public phone: string;
  public address: string;
  public key;

  constructor(key=null, number?, name?, phone?, address?) {
    this.key = key;
    this.number = number;
    this.name = name;
    this.phone = phone;
    this.address = address;
  }

  public stnumber = false; // خاص بالفحص
  public stname = false; // خاص بالفحص
  public stphone = false; // خاص بالفحص
  public staddress = false; // خاص بالفحص

  static initClients(...model) {
    return new Clients(...model);
  }

  static getNewClients(): Clients {
    return new Clients();
  }

  // هنا يتم عمل فحص للبيانات الحقول قبل ارسالها وتخذنها في القعده
  public validateInput() {
    let state = true;
    if (!Number.isInteger(this.number)) {
      state = false;
      this.stnumber = true;
    } else {
      this.stnumber = false;
    }

    if (this.name == undefined || this.name.length < 7) {
      state = false;
      this.stname = true;
    } else {
      this.stname = false;
    }

    if (this.phone === undefined || this.phone.toString().length !== 10) {
      state = false;
      this.stphone = true;
    } else {
      this.stphone = false;
    }

    if (this.address === undefined || this.address.trim() === '') {
      state = false;
      this.staddress = true;
    } else {
      this.staddress = false;
    }

    return state;
  }
}
