import { Component, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { HeroService } from '../../hero/hero.service';
import { ToastService } from '../toasts/toast-service';
import { NgbdModalConfirmAutofocusComponent } from '../ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import {
  NgbActiveModal,
  NgbModal,
  NgbNavChangeEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteComponent } from '../ngbd-table-complete/ngbd-table-complete.component';
import { CategorysServes } from './CategorysServes';
import { map } from 'rxjs/operators';
import { Categorys } from './Categorys';
import { AlertInfoComponent } from '../alert-info/alert-info.component';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css'],
})
export class CategorysComponent implements OnInit, OnDestroy {
  @ViewChild(NgbdTableCompleteComponent, { static: false })
  td: NgbdTableCompleteComponent;

  countries = Categorys.getCountries();
  model = Categorys.getNewCategorys();
  message;
  err;
  hedTable = ['الرقم', 'اسم الصنف', 'السعر', 'الدولة'];
  info = [];
  Id = 'CategorysComponent';
  postionTap = 0;

  public activeId = 1;
  public ngbnv1 = true;
  public ngbnv2 = false;
  subscription: Subscription;
  constructor(
    public toastService: ToastService,
    private categorysServes: CategorysServes, // fire
    private modalService: NgbModal,
    config: NgbNavConfig,
    private heroService: HeroService
  ) {
    this.message = heroService.message;
    this.err = heroService.err.Categorys;
    config.destroyOnHide = true;
    config.roles = 'tablist';
  }

  newHero() {}
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
      if (this.model.stsalary) {
        this.showDanger(this.err.salary);
      }
      if (this.model.stcountrie) {
        this.showDanger(this.err.countrie);
      }
    }
  }
  ngOnInit() {
    this.getCategorysList(); // fire
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, {
      classname: 'bg-danger text-light',
      delay: 15000,
    });
  }
  showSuccessMessage(message) {
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 3000,
    });
  }
  showSuccess() {
    this.toastService.toasts = [];
    this.categorysServes.createCategory(this.model, () => {
      this.model = Categorys.getNewCategorys();
      this.showSuccessMessage(this.message.success.plus);
    }); // firebase
  }

  getCategorysComponentInfo() {
    this.info = [];
    this.heroService.categorys.forEach((element) => {
      this.info.push([
        element.key,
        element.number,
        element.name,
        element.salary,
        element.countrie,
      ]); // fire to class
    });
    if (this.td !== null && this.td !== undefined) {
      this.td.service.setup(this.info);
    }

    this.info.reverse();
  }

  getCategorysList() {
   this.subscription =  this.categorysServes
      .getCategorysList()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((categorys) => {
        this.heroService.categorys = categorys;
        this.getCategorysComponentInfo();
      });
  }

  open() {
    if (this.postionTap === 0) {
      const NgbdMCAC = this.modalService.open(
        NgbdModalConfirmAutofocusComponent
      );
      NgbdMCAC.componentInstance.cleareInformation(() => {
        this.model = Categorys.getNewCategorys();
      }, 'الاصناف');
    }
  }
  setpostion(pos) {
    this.postionTap = pos;
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

  onNavChange(changeEvent: NgbNavChangeEvent) {}

  information() {
    this.modalService
      .open(AlertInfoComponent)
      .componentInstance.displayCategory();
  }
}
