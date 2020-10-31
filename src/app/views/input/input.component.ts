import { Subscription } from 'rxjs/internal/Subscription';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HeroService } from 'src/app/hero/hero.service';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toasts/toast-service';
import { NgbdModalConfirmAutofocusComponent } from '../ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteComponent } from '../ngbd-table-complete/ngbd-table-complete.component';
import { map } from 'rxjs/operators';
import { InputServes } from './InputServes';
import { Inputs } from './Inputs';
import { AlertInfoComponent } from '../alert-info/alert-info.component';
import { OnDestroy } from '@angular/core';
import { EditRow, Lang, TableEdit } from '../interfaces';
import { TableEditComponent } from '../ngbd-table-complete/edit/table-edit/table-edit.component';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: [
    './input.component.scss',
    '../ngbd-table-complete/edit/table-edit/table-edit.component.scss',
  ],
})
export class InputComponent
  implements OnInit, OnDestroy, EditRow, TableEdit, Lang {
  public get heroService(): HeroService {
    return this._heroService;
  }
  @ViewChild(NgbdTableCompleteComponent, { static: false })
  td: NgbdTableCompleteComponent;
  postionTap = 0;
  model: Inputs = Inputs.getNewInput();
  message;
  err;
  hedTable = [];
  form: any = {};
  info = [];
  Id = 'Input';
  public activeId = 1;
  public ngbnv1 = true;
  public ngbnv2 = false;
  subscription: Subscription;

  constructor(
    public toastService: ToastService,
    private inputServes: InputServes, // fire
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
    const edit = this.modalService.open(TableEditComponent, { size: 'xl' });
    const infoTableInput = [...Object.values(model[0]), ...model.slice(1)];
    edit.componentInstance.setupModel(
      this.Id,
      Inputs.initInput(...infoTableInput),
      false
    );
  }
  editItem(model: any) {
    const edit = this.modalService.open(TableEditComponent, { size: 'xl' });
    const infoTableInput = [...Object.values(model[0]), ...model.slice(1)];
    edit.componentInstance.setupCompo(
      this.Id,
      Inputs.initInput(...infoTableInput),
      this
    );
  }
  pushItem(model: any, modalN: any) {
    this.inputServes
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
    if (model.stdate) {
      this.showDanger(this.err.date);
    }
    if (model.stthesupplier) {
      this.showDanger(this.err.thesupplier);
    }
    if (model.stthestore) {
      this.showDanger(this.err.thestore);
    }
  }
  deleteItem(key: any, modalN: any) {
    this.inputServes
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
    this.inputServes.createInput(this.model, () => {
      this.model = Inputs.getNewInput();
      this.showSuccessMessage(this.message.success.plus);
    }); // firebase;
  }

  getInputComponentInfo() {
    this.info = [];
    this.heroService.input.forEach((element) => {
      this.info.push([
        {
          key: element.key,
          item: element.item,
          salary: element.salary,
          quantity: element.quantity,
          notes: element.notes,
        },
        element.number,
        element.thesupplier,
        element.date,
        element.thestore,
      ]);
    });
    if (this.td !== null && this.td !== undefined) {
      this.td.service.setup(this.info);
    }

    this.info.reverse();
    return this.info;
  }

  getCategorysList() {
    this.subscription = this.inputServes
      .getInputsList()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((input) => {
        this.heroService.input = input;
        this.getInputComponentInfo();
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
        this.model = Inputs.getNewInput();
      });
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
