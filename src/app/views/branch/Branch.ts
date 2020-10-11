import { HeroService } from 'src/app/hero/hero.service';

export class Branch {
  constructor(key = null, branchName?, name?, pass?, phone?, address?) {
    this.key = key;
    this.branchName = branchName;
    this.name = name;
    this.pass = pass;
    this.phone = phone;
    this.address = address;
  }
  public branchName: string;
  public name: string;
  public pass: number;
  public phone: string;
  public address: string;
  public key;

  public stbranchName = false;
  public stname = false;
  public stpass = false;
  public stphone = false;
  public staddress = false;

  static getNewBranch() {
    return new Branch();
  }

  static initBranch(...model) {
    return new Branch(...model);
  }

  public validateInput() {
    let state = true;
    if (this.branchName === undefined || this.branchName.length < 3) {
      state = false;
      this.stbranchName = true;
    } else {
      this.stbranchName = false;
    }

    if (this.name === undefined || this.name.length < 7) {
      state = false;
      this.stname = true;
    } else {
      this.stname = false;
    }

    if (this.pass === undefined || this.pass.toString().length < 7) {
      state = false;
      this.stpass = true;
    } else {
      this.stpass = false;
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
