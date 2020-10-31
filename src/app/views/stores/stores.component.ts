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
import { EditRow, Lang, TableEdit } from '../interfaces';
import { storage } from 'firebase';
import { TableEditComponent } from '../ngbd-table-complete/edit/table-edit/table-edit.component';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit, OnDestroy, EditRow, TableEdit, Lang {
  public get heroService(): HeroService {
    return this._heroService;
  }
  @ViewChild(NgbdTableCompleteComponent, { static: false })
  td: NgbdTableCompleteComponent;
  postionTap = 0;
  model = Stores.getNewStores();
  message;
  err;
  hedTable = [];
  info = [];
  form: any = {};
  Id = 'Stores';
  public activeId = 1;
  public ngbnv1 = true;
  public ngbnv2 = false;
  subscription: Subscription;
  constructor(
    public toastService: ToastService,
    private storesServes: StoresServes, // fire
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
      Stores.initStores(...model),
      this
    );
  }
  pushItem(model: any, modalN: any) {
    this.storesServes
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
    if (model.ststorekeeper) {
      this.showDanger(this.err.storekeeper);
    }
  }
  deleteItem(key: any, modalN: any) {
    this.storesServes
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
    this.getCategorysList();
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
      const NgbdMCAC = this.modalService.open(
        NgbdModalConfirmAutofocusComponent
      );
      NgbdMCAC.componentInstance.cleareInformation(() => {
        this.model = Stores.getNewStores();
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
