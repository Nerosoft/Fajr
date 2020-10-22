import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from 'src/app/hero/hero.service';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toasts/toast-service';
import { NgbdModalConfirmAutofocusComponent } from '../ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteComponent } from '../ngbd-table-complete/ngbd-table-complete.component';

import { map } from 'rxjs/operators';
import { CategorysComponent } from '../categorys/categorys.component';

import { Branch } from './Branch';
import { BranchServes } from './BranchServes';
import { AlertInfoComponent } from '../alert-info/alert-info.component';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { EditRow, TableEdit } from '../interfaces';
import { TableEditComponent } from '../ngbd-table-complete/edit/table-edit/table-edit.component';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})
export class BranchComponent implements OnInit, OnDestroy, EditRow, TableEdit {
  @ViewChild(NgbdTableCompleteComponent, { static: false })
  td: NgbdTableCompleteComponent;
  postionTap = 0;
  model = Branch.getNewBranch();
  message;
  err;
  hedTable = ['اسم المستخدم', 'اسم الفرع', 'كلمة المرور', 'الهاتف', 'العنوان'];
  info = [];
  public activeId = 1;
  public ngbnv1 = true;
  public ngbnv2 = false;
  Id = 'BranchComponent';
  subscription: Subscription;
  constructor(
    public toastService: ToastService,
    private branchServes: BranchServes,
    private modalService: NgbModal,
    private heroService: HeroService,
    private config: NgbNavConfig
  ) {
    this.message = this.heroService.message;
    this.err = this.heroService.err.Branch;
    config.destroyOnHide = true;
    config.roles = 'tablist';
  }
  showItem(model: any) {
    throw new Error('Method not implemented.');
  }
  editItem(model: any) {
    const edit = this.modalService.open(TableEditComponent, { size: 'xl' });
    edit.componentInstance.setupCompo(
      this.Id,
      Branch.initBranch(...model),
      this
    );
  }
  pushItem(model: any, modalN: any) {
    this.branchServes.updateF(model.key, model).then(modalN.close);
  }
  checkItem(model: any) {
    if (model.stbranchName) {
      this.showDanger(this.err.branch);
    }
    if (model.stname) {
      this.showDanger(this.err.name);
    }
    if (model.stpass) {
      this.showDanger(this.err.pass);
    }
    if (model.stphone) {
      this.showDanger(this.err.phone);
    }
    if (model.staddress) {
      this.showDanger(this.err.address);
    }
  }
  deleteItem(key: any, modalN: any) {
    this.branchServes.deleteF(key).then(modalN.close);
  }
  get This() {
    return this;
  }
  ngOnInit() {
    this.getBranchsList();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  savaDAtaBase() {
    if (this.model.validateInput()) {
      this.showSuccess();
    } else {
      this.checkItem(this.model)
    }
  }
  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, {
      classname: 'bg-danger text-light',
      delay: 4000,
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
    this.branchServes.createBranch(this.model, () => {
      this.model = Branch.getNewBranch();
      this.showSuccessMessage(this.message.success.plus);
    });
  }

  getBranchsList() {
    this.subscription =  this.branchServes
      .getBranchsList()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((branch) => {
        this.heroService.Branch = branch;
        this.getBranchsComponentInfo();
      });
  }

  getBranchsComponentInfo() {
    this.info = [];
    this.heroService.Branch.forEach((element: Branch) => {
      this.info.push([
        element.key,
        element.branchName,
        element.name,
        element.pass,
        element.phone,
        element.address,
      ]);
    });

    if (this.td !== null && this.td !== undefined) {
      this.td.service.setup(this.info);
    }

    this.info.reverse();
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {}

  setpostion(pos) {}

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
  open() {

    if (this.postionTap === 0) {
      const NgbdMCAC = this.modalService.open(
        NgbdModalConfirmAutofocusComponent
      );
      NgbdMCAC.componentInstance.cleareInformation(() => {
        this.model = Branch.getNewBranch();
      }, 'الفروع');
    }

    if (this.postionTap === 1) {
    }
  }

  information() {
    this.modalService
      .open(AlertInfoComponent)
      .componentInstance.displayBranch();
  }
}
