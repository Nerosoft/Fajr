export class InputAndOut {
  item: any;
  salary: number;
  quantity: number;
  total: number;
  notes: any;
  stitem: any;
  stsalary: any;
  stquantity: any;
  sttotal: any;
  stnotes: any;
  constructor(item?, salary?, quantity?, notes?) {
    this.item = item || '';
    this.salary = salary || '0';
    this.quantity = quantity || 1;
    this.notes = notes || '';
  }
}
