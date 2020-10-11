import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-modal-confirm-autofocus',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">{{ header }}</h4>
      <button
        type="button"
        class="close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        <strong
          >{{ mes1 }} <span class="text-primary">"{{ mes2 }}"</span
          >{{ header }}؟</strong
        >
      </p>
      <p>
        {{ mes3 }}
        <span class="text-danger">{{ mes4 }}</span>
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Cancel
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-danger"
        (click)="callback(); modal.dismiss('cancel click')"
      >
        Ok
      </button>
    </div>
  `,
  styleUrls: ['./ngbd-modal-confirm-autofocus.component.css'],
})
export class NgbdModalConfirmAutofocusComponent implements OnInit {
  header: string;
  mes1: String;
  mes2: string;
  mes3: string;
  mes4: string;
  callback: any;
  constructor(public modal: NgbActiveModal) {}

  ngOnInit() {}

  public cleareInformation(callback, titel) {
    this.header = titel;
    this.mes1 = 'هل انت متأكد من اجراء';
    this.mes2 = 'مسح شاشة';
    this.mes3 = 'سيتم تنظيف الشاشة بالكامل.';
    this.mes4 = 'هذه العملية لا يمكن الرجوع فيها.';
    this.callback = callback;
  }


  public removeItem(callback,titel,name) {
    this.header = titel
    this.mes1 = 'هل انت متأكد من اجراء';
    this.mes2 = 'حذف ' + name;
    this.mes3 = 'سيتم اجراء العملية.';
    this.mes4 = 'هذه العملة لا يمكن الرجوع فيها.';
    this.callback = callback;
  }


}
