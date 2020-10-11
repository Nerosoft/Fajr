import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeroService } from 'src/app/hero/hero.service';
import { ToastService } from 'src/app/views/toasts/toast-service';
import { Categorys } from 'src/app/views/categorys/Categorys';
import { Clients } from 'src/app/views/clients/Clients';
import { Stores } from 'src/app/views/stores/Stores';
import { Suppliers } from 'src/app/views/suppliers/Suppliers';
import { Inputs } from 'src/app/views/input/Inputs';
import { Outs } from 'src/app/views/output/Outs';
import { Branch } from 'src/app/views/branch/Branch';
import { CategorysServes } from 'src/app/views/categorys/CategorysServes';
import { ClientsServes } from 'src/app/views/clients/ClientsServes';
import { SuppliersServes } from 'src/app/views/suppliers/SuppliersServes';
import { StoresServes } from 'src/app/views/stores/storesServes';
import { BranchServes } from 'src/app/views/branch/BranchServes';
import { InputServes } from 'src/app/views/input/InputServes';
import { OutServes } from 'src/app/views/output/OutServes';
import { NgbdModalConfirmAutofocusComponent } from 'src/app/views/ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.css'],
})
export class TableEditComponent implements OnInit {
  public get heroService(): HeroService {
    return this._heroService;
  }
  componant = {
    ClientsComponent: 'شاشة العملاء',
    CategorysComponent: 'شاشة الاصناف',
    SuppliersComponent: 'شاشة الموردين',
    StoresComponent: 'شاشة المخازن',
    InputComponent: 'شاشة المشتريات',
    OutputComponent: 'شاشة المبيعات',
    BranchComponent: 'شاشة الافرع',
    ['InputComponent/show']: 'عرض شاشة المشترايات',
    ['OutputComponent/show']: 'عرض شاشة المبيعات',
  };
  model;
  err;
  Id;
  oky: any;
  deletethis: any;
  message;
  constructor(
    public modalN: NgbActiveModal,
    public modalService: NgbModal,
    public toastService: ToastService,
    // tslint:disable-next-line: variable-name
    private _heroService: HeroService,
    private categorysServes: CategorysServes,
    private clientsServes: ClientsServes,
    private suppliersServes: SuppliersServes,
    private storesServes: StoresServes,
    private branchServes: BranchServes,
    private inputServes: InputServes,
    private outServes: OutServes
  ) {
    this.message = this.heroService.message;
  }

  ngOnInit() {}

  setupCategory(ID, model) {
    this.model = Categorys.initCategorys(...model);
    this.err = this.heroService.err.Categorys;
    this.Id = ID;
    this.oky = () => {
      if (this.model.validateInput()) {
        this.categorysServes
          .updateF(model[0], this.model)
          .then(this.modalN.close);
      } else {
        if (this.model.stnumber) {
          this.showDanger(this.err.number);
        }
        if (this.model.stname) {
          this.showDanger(this.err.name);
        }
        if (this.model.stsalary) {
          this.showDanger(this.err.salary);
        }
        if (this.model.stcountrie) {
          this.showDanger(this.err.countrie);
        }
      }
    };
    this.deletethis = () => {
      this.deleteItem('الاصناف', this.model.name, () => {
        this.categorysServes.deleteF(model[0]).then(this.modalN.close);
      });
    };
  }

  setupClint(ID, model) {
    this.model = Clients.initClients(...model);
    this.err = this.heroService.err.Clients;
    this.Id = ID;
    this.oky = () => {
      if (this.model.validateInput()) {
        this.clientsServes
          .updateF(model[0], this.model)
          .then(this.modalN.close);
      } else {
        if (this.model.stnumber) {
          this.showDanger(this.err.number);
        }
        if (this.model.stname) {
          this.showDanger(this.err.name);
        }
        if (this.model.stphone) {
          this.showDanger(this.err.phone);
        }
        if (this.model.staddress) {
          this.showDanger(this.err.address);
        }
      }
    };
    this.deletethis = () => {
      this.deleteItem('العملاء', this.model.name, () => {
        this.clientsServes.deleteF(model[0]).then(this.modalN.close);
      });
    };
  }

  setupSupplier(ID, model) {
    this.model = Suppliers.initSuppliers(...model);
    this.err = this.heroService.err.Suppliers;
    this.Id = ID;
    this.oky = () => {
      if (this.model.validateInput()) {
        this.suppliersServes
          .updateF(model[0], this.model)
          .then(this.modalN.close);
      } else {
        if (this.model.stnumber) {
          this.showDanger(this.err.number);
        }
        if (this.model.stname) {
          this.showDanger(this.err.name);
        }
        if (this.model.stphone) {
          this.showDanger(this.err.phone);
        }
        if (this.model.staddress) {
          this.showDanger(this.err.address);
        }
      }
    };
    this.deletethis = () => {
      this.deleteItem('الموردين', this.model.name, () => {
        this.suppliersServes.deleteF(model[0]).then(this.modalN.close);
      });
    };
  }

  setupStores(ID, model) {
    this.model = Stores.initStores(...model); //
    this.err = this.heroService.err.Stores; //
    this.Id = ID;
    this.oky = () => {
      if (this.model.validateInput()) {
        //
        this.storesServes
          .updateF(model[0], this.model)
          .then(this.modalN.close);
      } else {
        if (this.model.stnumber) {
          this.showDanger(this.err.number);
        }
        if (this.model.stname) {
          this.showDanger(this.err.name);
        }
        if (this.model.ststorekeeper) {
          this.showDanger(this.err.storekeeper);
        }
      }
    };
    this.deletethis = () => {
      this.deleteItem('المخازن', this.model.name, () => {
        this.storesServes.deleteF(model[0]).then(this.modalN.close);
      });
    };
  }

  setupBranch(ID, model) {
    this.model = Branch.initBranch(...model); //
    this.err = this.heroService.err.Branch; //
    this.Id = ID;
    this.oky = () => {
      if (this.model.validateInput()) {
        this.branchServes
        .updateF(model[0], this.model)
        .then(this.modalN.close);
      } else {
        if (this.model.stbranchName) {
          this.showDanger(this.err.branch);
        }
        if (this.model.stname) {
          this.showDanger(this.err.name);
        }
        if (this.model.stpass) {
          this.showDanger(this.err.pass);
        }
        if (this.model.stphone) {
          this.showDanger(this.err.phone);
        }
        if (this.model.staddress) {
          this.showDanger(this.err.address);
        }
      }
    };
    this.deletethis = () => {
      this.deleteItem('الفروع', this.model.name, () => {
        this.branchServes.deleteF(model[0]).then(this.modalN.close);
      });
    };
  }

  setupInput(ID, model, show?) {
    this.model = Inputs.initInput(...model); //
    this.Id = ID;
    if (show) {
      return;
    }
    this.err = this.heroService.err.Input; //
    this.oky = () => {
      if (this.model.validateInput()) {
        //
        this.inputServes.updateF(model[0], this.model).then(this.modalN.close);
      } else {
        if (this.model.stnumber) {
          this.showDanger(this.err.number);
        }
        if (this.model.stdate) {
          this.showDanger(this.err.date);
        }
        if (this.model.stthesupplier) {
          this.showDanger(this.err.thesupplier);
        }
        if (this.model.stthestore) {
          this.showDanger(this.err.thestore);
        }
      }
    };
    this.deletethis = () => {
      this.deleteItem('المشترايات', this.model.name, () => {
      this.inputServes.deleteF(model[0]).then(this.modalN.close);
      });
    };
  }

  setupOut(ID, model, show?) {
    this.model = Outs.initOut(...model); //
    this.Id = ID;
    if (show) {
      return;
    }
    this.err = this.heroService.err.Out; //
    this.oky = () => {
      if (this.model.validateInput()) {
        //
        this.outServes.updateF(model[0], this.model).then(this.modalN.close);
      } else {
        if (this.model.stnumber) {
          this.showDanger(this.err.number);
        }
        if (this.model.stdate) {
          this.showDanger(this.err.date);
        }
        if (this.model.sttheclient) {
          this.showDanger(this.err.theclient);
        }
      }
    };
    this.deletethis = () => {
      this.deleteItem('المشترايات', this.model.name, () => {
      this.outServes.deleteF(model[0]).then(this.modalN.close);
      });
    };
  }
  onChange(index) {
    this.model.salary = this.heroService.categorys[index].salary;
  }

  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, {
      classname: 'bg-danger text-light',
      delay: 15000,
    });
  }

  deleteItem(titel, name, callback) {
    const NgbdMCAC = this.modalService.open(
      NgbdModalConfirmAutofocusComponent
    );
    NgbdMCAC.componentInstance.removeItem(callback, titel, name);
  }
}
