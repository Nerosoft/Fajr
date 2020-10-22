import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeroService } from 'src/app/hero/hero.service';
import { ToastService } from 'src/app/views/toasts/toast-service';
import { NgbdModalConfirmAutofocusComponent } from 'src/app/views/ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import { TableEdit } from 'src/app/views/interfaces';

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
    ['show/InputComponent']: 'عرض شاشة المشترايات',
    ['show/OutputComponent']: 'عرض شاشة المبيعات',
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
  ) {
    this.message = this.heroService.message;
  }

  ngOnInit() {}
  setupModel(ID, model: any) {
    this.model = model;
    this.Id = ID;
  }
  setupCompo(ID, model, tableEdit: TableEdit) {
    this.setupModel(ID, model);
    this.oky = () => {
      if (this.model.validateInput()) {
        tableEdit.pushItem(this.model, this.modalN);
      } else {
        tableEdit.checkItem(this.model);
      }
    };

    this.deletethis = () => {
      this.deleteItem('الاصناف', this.model.name, () => {
        tableEdit.deleteItem(model.key, this.modalN);
      });
    };
  }

  onChange(index) {
    this.model.salary = this.heroService.categorys[index].salary;
  }



  deleteItem(titel, name, callback) {
    const NgbdMCAC = this.modalService.open(NgbdModalConfirmAutofocusComponent);
    NgbdMCAC.componentInstance.removeItem(callback, titel, name);
  }
}
