import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from 'src/app/hero/hero.service';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toasts/toast-service';
import { NgbdModalConfirmAutofocusComponent } from '../ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteComponent } from '../ngbd-table-complete/ngbd-table-complete.component';
import { OutServes } from './OutServes';
import { map } from 'rxjs/operators';
import { Outs } from './Outs';
import { AlertInfoComponent } from '../alert-info/alert-info.component';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
})
export class OutputComponent implements OnInit, OnDestroy {
  public get heroService(): HeroService {
    return this._heroService;
  }
  @ViewChild(NgbdTableCompleteComponent, { static: false })
  td: NgbdTableCompleteComponent;
  postionTap = 0;
  model = Outs.getNewOut();
  message;
  err;
  hedTable = ['رقم البيع', 'العميل', 'التاريخ', 'عرض'];
  info = [];
  Id = 'OutputComponent';
  public activeId = 1;
  public ngbnv1 = true;
  public ngbnv2 = false;
  subscription: Subscription;
  constructor(
    public toastService: ToastService,
    private outServes: OutServes, //fire
    private _modalService: NgbModal,
    private _heroService: HeroService,
    config: NgbNavConfig
  ) {
    this.message = this.heroService.message;
    this.err = this.heroService.err.Out;
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
      if (this.model.stdate) {
        this.showDanger(this.err.date);
      }
      if (this.model.sttheclient) {
        this.showDanger(this.err.theclient);
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
    this.outServes.createOut(this.model, () => {
      this.model = Outs.getNewOut();
      this.showSuccessMessage(this.message.success.plus);
    });
  }

  getInputComponentInfo() {
    this.info = [];
    this.heroService.out.forEach((element) => {
      this.info.push([
        {
          key: element.key,
          item: element.item,
          salary: element.salary,
          quantity: element.quantity,
          notes: element.notes,
        },
        element.number,
        element.theclient,
        element.date,
      ]);
    });

    if (this.td !== null && this.td !== undefined) {
      this.td.service.setup(this.info);
    }

    this.info.reverse();
    return this.info;
  }

  getCategorysList() {
    this.subscription = this.outServes
      .getOutsList()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((out) => {
        this.heroService.out = out;
        this.getInputComponentInfo();
      });
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {

  }
  onChange(index) {
    this.model.salary = this.heroService.categorys[index].salary;
  }
  setpostion(pos) {
    this.postionTap = pos;
  }
  open() {
    if (this.postionTap === 0) {
      const NgbdMCAC = this._modalService.open(
        NgbdModalConfirmAutofocusComponent
      );
      NgbdMCAC.componentInstance.cleareInformation(() => {
        this.model = Outs.getNewOut();
      }, 'المبيعات');
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
    this._modalService.open(AlertInfoComponent).componentInstance.displayOut();
  }

}
