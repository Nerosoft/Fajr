import { HeroService } from './../../hero/hero.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-modal-confirm-autofocus',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">{{ doAction.header }}</h4>
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
          >{{ doAction.mes1 }} <span class="text-primary">"{{ doAction.mes2 }} {{ name }}"</span
          >{{ doAction.header }}؟</strong
        >
      </p>
      <p>
        {{ doAction.mes3 }}
        <span class="text-danger">{{ doAction.mes4 }}</span>
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
      {{heroService.lang['cancel']}}
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-danger"
        (click)="callback(); modal.dismiss('cancel click')"
      >
      {{heroService.lang['ok']}}
      </button>
    </div>
  `,
  styleUrls: ['./ngbd-modal-confirm-autofocus.component.scss'],
})
export class NgbdModalConfirmAutofocusComponent implements OnInit {
  public get heroService(): HeroService {
    return this._heroService;
  }
  doAction: any = {};
  callback: any;
  name = '';
  constructor(
    public modal: NgbActiveModal,
    private _heroService: HeroService,
    ) {
  }

  ngOnInit() {}

  public cleareInformation(callback) {
    this.setupLang();
    this.callback = callback;
  }


  public removeItem(callback, name) {
    this.setupLang();
    this.name = name;
    this.callback = callback;
  }

setupLang(){
  this.doAction = this.heroService.lang.doAction;
}
}
