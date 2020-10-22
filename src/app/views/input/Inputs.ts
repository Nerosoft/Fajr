import { InputAndOut } from 'src/app/hero/InputAndOut';

export class Inputs extends InputAndOut {
  public number: number;
  public date: string;
  public thesupplier: string;
  public thestore: string;
  public key;

  public thesuppliers = [];
  public thestores = [];

  public stnumber = false;
  public stdate = false;
  public stthesupplier = false;
  public stthestore = false;

  constructor(
    key = null,
    item?,
    salary?,
    quantity?,
    notes?,
    number?,
    thesupplier?,
    date?,
    thestore?
  ) {
    super(item, salary, quantity, notes);
    this.key = key;
    this.number = number;
    this.date = date;
    this.thesupplier = thesupplier;
    this.thestore = thestore;
    this.total = this.getTotal();
  }

  static getNewInput(): Inputs {
    return new Inputs();
  }
  static initInput(...model) {
    return new Inputs(...model);
  }


  getTotal() {
    return this.quantity * this.salary;
  }

  public validateInput() {
    let state = true;
    if (!Number.isInteger(this.number)) {
      state = false;
      this.stnumber = true;
    } else this.stnumber = false;

    if (this.date == undefined || this.date.length < 7) {
      state = false;
      this.stdate = true;
    } else this.stdate = false;

    if (this.thesupplier == undefined || this.thesupplier.trim() == '') {
      state = false;
      this.stthesupplier = true;
    } else this.stthesupplier = false;

    if (this.thestore == undefined || this.thestore.trim() == '') {
      state = false;
      this.stthestore = true;
    } else this.stthestore = false;

    return state;
  }
}
