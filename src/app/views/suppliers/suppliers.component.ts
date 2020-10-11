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

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent implements OnInit, OnDestroy {
  @ViewChild(NgbdTableCompleteComponent, { static: false })
  td: NgbdTableCompleteComponent;
  postionTap = 0;
  model = Suppliers.getNewSuplier();
  message;
  err;
  hedTable = ['الرقم', 'الاسم', 'الهاتف', 'العنوان'];
  info = [];
  Id = 'SuppliersComponent';
  public activeId = 1;
  public ngbnv1 = true;
  public ngbnv2 = false;
  subscription: Subscription;
  constructor(
    public toastService: ToastService,
    private suppliersServes: SuppliersServes,
    private modalService: NgbModal,
    private heroService: HeroService,
    config: NgbNavConfig
  ) {
    this.message = this.heroService.message;
    this.err = this.heroService.err.Suppliers;
    config.destroyOnHide = true;
    config.roles = 'tablist';
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
      }, 'الموردين');
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
      .componentInstance.displaySupplier();
  }
}
