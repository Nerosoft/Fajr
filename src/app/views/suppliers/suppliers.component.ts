import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from 'src/app/hero/hero.service';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toasts/toast-service';
import { NgbdModalConfirmAutofocusComponent } from '../ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteComponent } from '../ngbd-table-complete/ngbd-table-complete.component';
import { SuppliersServes } from './SuppliersServes';
import { map } from 'rxjs/operators';
import { Suppliers } from './Suppliers';
import { AlertInfoComponent } from '../alert-info/alert-info.component';

import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { EditRow, Lang, TableEdit } from '../interfaces';
import { TableEditComponent } from '../ngbd-table-complete/edit/table-edit/table-edit.component';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
})
export class SuppliersComponent
  implements OnInit, OnDestroy, EditRow, TableEdit, Lang {
  public get heroService(): HeroService {
    return this._heroService;
  }

  @ViewChild(NgbdTableCompleteComponent, { static: false })
  td: NgbdTableCompleteComponent;
  postionTap = 0;
  model = Suppliers.getNewSuplier();
  message;
  err;
  form: any = {};
  hedTable = [];
  info = [];
  Id = 'Suppliers';
  public activeId = 1;
  public ngbnv1 = true;
  public ngbnv2 = false;
  subscription: Subscription;
  constructor(
    public toastService: ToastService,
    private suppliersServes: SuppliersServes,
    private modalService: NgbModal,
    private _heroService: HeroService,
    private config: NgbNavConfig
  ) {
    this.heroService.setupLanguage(this);

    this.config.destroyOnHide = true;
    this.config.roles = 'tablist';
  }

  setupLang(lang: any) {
    this.message = lang.message;
    this.hedTable = lang.compoMessage[this.Id].table;
    this.form = lang.compoMessage[this.Id].form;
    this.err = lang.compoMessage[this.Id].err;
  }
  showItem(model: any) {
    throw new Error('Method not implemented.');
  }
  editItem(model: any) {
    const edit = this.modalService.open(TableEditComponent, { size: 'xl' });
    edit.componentInstance.setupCompo(
      this.Id,
      Suppliers.initSuppliers(...model),
      this
    );
  }
  pushItem(model: any, modalN: any) {
    this.suppliersServes
      .updateF(model.key, model)
      .then(() => {
        this.showSuccessMessage(this.message.success.plus);
      })
      .then(modalN.close);
  }
  checkItem(model: any) {
    if (model.stnumber) {
      this.showDanger(this.err.number);
    }
    if (model.stname) {
      this.showDanger(this.err.name);
    }
    if (model.stphone) {
      this.showDanger(this.err.phone);
    }
    if (model.staddress) {
      this.showDanger(this.err.address);
    }
  }
  deleteItem(key: any, modalN: any) {
    this.suppliersServes
      .deleteF(key)
      .then(() => {
        this.showSuccessMessage(this.message.success.plus);
      })
      .then(modalN.close);
  }
  get This() {
    return this;
  }
  ngOnInit() {
    this.getSuppliersList();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  savaDAtaBase() {
    if (this.model.validateInput()) {
      this.showSuccess();
    } else {
      this.checkItem(this.model);
    }
  }
  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, {
      classname: 'bg-danger text-light',
      delay: 15000,
    });
  }
  showSuccessMessage(dangerTpl) {
    this.toastService.show(dangerTpl, {
      classname: 'bg-success text-light',
      delay: 3000,
    });
  }
  showSuccess() {
    this.toastService.toasts = [];
    this.suppliersServes.createSuppliers(this.model, () => {
      this.model = Suppliers.getNewSuplier();
      this.showSuccessMessage(this.message.success.plus);
    });
  }

  getSuppliersList() {
    this.subscription = this.suppliersServes
      .getSuppliersList()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((suppliers) => {
        this.heroService.suppliers = suppliers;
        this.getSuppliersComponentInfo();
      });
  }

  getSuppliersComponentInfo() {
    this.info = [];
    this.heroService.suppliers.forEach((element) => {
      this.info.push([
        element.key,
        element.number,
        element.name,
        element.phone,
        element.address,
      ]);
    });

    if (this.td !== null && this.td !== undefined) {
      this.td.service.setup(this.info);
    }

    this.info.reverse();
    return this.info;
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {}

  setpostion(pos) {
    this.postionTap = pos;
  }
  open() {
    if (this.postionTap === 0) {
      const NgbdMCAC = this.modalService.open(
        NgbdModalConfirmAutofocusComponent
      );
      NgbdMCAC.componentInstance.cleareInformation(() => {
        this.model = Suppliers.getNewSuplier();
      });
    }

    if (this.postionTap === 1) {
    }
  }

  setnav(vn) {
    this.activeId = vn;
    if (vn === 1) {
      this.ngbnv1 = true;
      this.ngbnv2 = false;
    } else if (vn === 2) {
      this.ngbnv2 = true;
      this.ngbnv1 = false;
    }
  }

  information() {
    this.modalService
      .open(AlertInfoComponent)
      .componentInstance.display(this.Id);
  }
}
