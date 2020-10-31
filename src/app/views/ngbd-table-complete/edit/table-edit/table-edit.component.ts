import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeroService } from 'src/app/hero/hero.service';
import { NgbdModalConfirmAutofocusComponent } from 'src/app/views/ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import { TableEdit } from 'src/app/views/interfaces';

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./table-edit.component.scss'],
})
export class TableEditComponent implements OnInit {
  public get heroService(): HeroService {
    return this._heroService;
  }
  model;
  form: any = {};
  Id;
  oky: any;
  notShow = true;
  deletethis: any;
  constructor(
    public modalN: NgbActiveModal,
    public modalService: NgbModal,
    // tslint:disable-next-line: variable-name
    private _heroService: HeroService,
  ) {}




  ngOnInit() {}
  setupModel(ID, model: any, show = true) {
    this.model = model;
    this.Id = ID;
    this.form = this.heroService.lang.compoMessage[this.Id].form;
    this.notShow = show;
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
      this.deleteItem(this.heroService.lang[this.Id], this.model.name, () => {
        tableEdit.deleteItem(model.key, this.modalN);
      });
    };
  }

  onChange(index) {
    this.model.salary = this.heroService.categorys[index].salary;
  }



  deleteItem(titel, name, callback) {
    const NgbdMCAC = this.modalService.open(NgbdModalConfirmAutofocusComponent);
    NgbdMCAC.componentInstance.removeItem(callback, name);
  }
}
