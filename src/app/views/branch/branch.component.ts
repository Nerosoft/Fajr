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


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  @ViewChild(NgbdTableCompleteComponent, { static: false }) td: NgbdTableCompleteComponent;
  postionTap = 0;
  model = Branch.setBranch();
  message=HeroService.message
  err = HeroService.err.Branch;
  hedTable = ["اسم المستخدم", "اسم الفرع", "كلمة المرور", "الهاتف", "العنوان"];
  info = [];
  public activeId = 1;
  public ngbnv1 = true;
  public ngbnv2 = false;
  Id = "BranchComponent";
  constructor(public toastService: ToastService,
    private branchServes: BranchServes,
    private _modalService: NgbModal,
    config: NgbNavConfig) {
      config.destroyOnHide = true;
      config.roles = "tablist";
      HeroService.nvCategorysServes=this.branchServes;
      NgbdTableCompleteComponent.callback=()=>{
        this.getBranchsComponentInfo()
      }

  }

  ngOnInit() {
    this.getBranchsList()
  }

  savaDAtaBase(dangerTpl) {
    if (this.model.validateInput()) {
      this.showSuccess();
    } else {

      if (this.model.stbranchName)
        this.showDanger(dangerTpl[0])
      if (this.model.stname)
        this.showDanger(dangerTpl[1])
      if (this.model.stpass)
        this.showDanger(dangerTpl[2])
      if (this.model.stphone)
        this.showDanger(dangerTpl[3])
      if (this.model.staddress)
        this.showDanger(dangerTpl[4])
    }
  }
  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 4000 });
  }
  showSuccess() {
    this.toastService.toasts = [];
    this.branchServes.createBranch(this.model);//firebase
    this.model.setClients(this.model);
    this.model = Branch.setBranch();
    this.getBranchsComponentInfo();
    // console.log(this.model.getClients());
    this.toastService.show(this.message.success.plus, { classname: 'bg-success text-light', delay: 3000 });
  }


  getBranchsList() {
    this.branchServes.getBranchsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(branch => {
      HeroService.Branch = branch;
      this.getBranchsComponentInfo()
      console.log(HeroService.Branch);
    });
  }


  getBranchsComponentInfo() {
    this.info = [];
    HeroService.Branch.forEach((element: Branch) => {
      this.info.push([[
        element.name,
        element.branchName,
        element.pass,
        element.phone,
        element.address
      ], element.key]);
    });

    if (this.td !== null && this.td !== undefined)
      this.td.service.setup(this.info);

    this.info.reverse();
    return this.info
  }


  onNavChange(changeEvent: NgbNavChangeEvent) {
    console.log("xxxxxxxxxxxxxxxx", changeEvent.nextId);

  }

  setpostion(pos) {

  }

  setnav(vn) {
    this.activeId = vn;
    if (vn == 1) {
      this.ngbnv1 = true;
      this.ngbnv2 = false;
    }
    else if (vn == 2) {
      this.ngbnv2 = true;
      this.ngbnv1 = false;
    }

  }
  open() {
    if (this.postionTap == 0) {
      NgbdModalConfirmAutofocusComponent.setupClientsComponent(() => {
        this.model = Branch.setBranch();
      });
      this._modalService.open(NgbdModalConfirmAutofocusComponent);
    } if (this.postionTap == 1) {

    }
  }

  information(){
    this._modalService.open(AlertInfoComponent).componentInstance.displayBranch()
   }

  
}
