import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from 'src/app/hero/hero.service';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toasts/toast-service';
import { NgbdModalConfirmAutofocusComponent } from '../ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteComponent } from '../ngbd-table-complete/ngbd-table-complete.component';
import { map } from 'rxjs/operators';
import { StoresServes } from './storesServes';
import { CategorysComponent } from '../categorys/categorys.component';
import { Stores } from './Stores';
import { AlertInfoComponent } from '../alert-info/alert-info.component';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
})
export class StoresComponent implements OnInit, OnDestroy {
  @ViewChild(NgbdTableCompleteComponent, { static: false })
  td: NgbdTableCompleteComponent;
  postionTap = 0;
  model = Stores.getNewStores();
  message;
  err;
  hedTable = ['رقم المخزن', 'اسم المخزن', 'امين المخزن'];
  info = [];
  Id = 'StoresComponent';
  public activeId = 1;
  public ngbnv1 = true;
  public ngbnv2 = false;
  subscription: Subscription;
  constructor(
    public toastService: ToastService,
    private storesServes: StoresServes, // fire
    private _modalService: NgbModal,
    private heroService: HeroService,
    config: NgbNavConfig
  ) {
    this.message = this.heroService.message;
    this.err = this.heroService.err.Stores;
    config.destroyOnHide = true;
    config.roles = 'tablist';
  }

  ngOnInit() {
    this.getCategorysList();
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
      if (this.model.ststorekeeper) {
        this.showDanger(this.err.storekeeper);
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
    this.storesServes.createStore(this.model, () => {
      this.model = Stores.getNewStores();
      this.showSuccessMessage(this.message.success.plus);
    });
  }

  getStoresComponentInfo() {
    this.info = [];
    this.heroService.stores.forEach((element) => {
      this.info.push([
        element.key,
        element.number,
        element.name,
        element.storekeeper,
      ]);
    });

    if (this.td !== null && this.td !== undefined) {
      this.td.service.setup(this.info);
    }

    this.info.reverse();
    return this.info;
  }

  getCategorysList() {
    this.subscription = this.storesServes
      .getStoresList()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((stores) => {
        this.heroService.stores = stores;
        this.getStoresComponentInfo();
      });
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {}

  setpostion(pos) {
    this.postionTap = pos;
  }
  open() {
    if (this.postionTap === 0) {
      const NgbdMCAC = this._modalService.open(
        NgbdModalConfirmAutofocusComponent
      );
      NgbdMCAC.componentInstance.cleareInformation(() => {
        this.model = Stores.getNewStores();
      }, 'المخازن');
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
    this._modalService
      .open(AlertInfoComponent)
      .componentInstance.displaystores();
  }
}
