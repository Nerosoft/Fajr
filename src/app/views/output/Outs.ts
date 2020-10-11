import { InputAndOut } from 'src/app/hero/InputAndOut';
import { HeroService } from 'src/app/hero/hero.service';

export class Outs extends InputAndOut {
  constructor(
    key = null,
    item?,
    salary?,
    quantity?,
    notes?,
    number?,
    theclient?,
    date?
  ) {
    super(item, salary, quantity, notes);
    this.number = number;
    this.date = date;
    this.theclient = theclient;
    this.getTotal();
  }
  public number: number;
  public date: string;
  public key;
  public theclient: string;

  public stnumber = false;
  public stdate = false;
  public sttheclient = false;

  static getNewOut(): Outs {
    return new Outs();
  }
  static initOut(...model) {
    return new Outs(...model);
  }

  getTotal() {
    return this.quantity * this.salary;
  }

  public validateInput() {
    let state = true;
    if (!Number.isInteger(this.number)) {
      state = false;
      this.stnumber = true;
    } else {
      this.stnumber = false;
    }

    if (this.date === undefined || this.date.length < 5) {
      state = false;
      this.stdate = true;
    } else {
      this.stdate = false;
    }

    if (this.theclient === undefined || this.theclient.trim() === '') {
      state = false;
      this.sttheclient = true;
    } else {
      this.sttheclient = false;
    }

    return state;
  }
}
