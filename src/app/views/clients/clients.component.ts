import { Subscription } from 'rxjs/internal/Subscription';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from 'src/app/hero/hero.service';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toasts/toast-service';
import { NgbdModalConfirmAutofocusComponent } from '../ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteComponent } from '../ngbd-table-complete/ngbd-table-complete.component';
import { ClientsServes } from './ClientsServes';
import { map } from 'rxjs/operators';
import { CategorysComponent } from '../categorys/categorys.component';
import { Clients } from './Clients';
import { AlertInfoComponent } from '../alert-info/alert-info.component';
import { OnDestroy } from '@angular/core';
import { EditRow, TableEdit } from '../interfaces';
import { TableEditComponent } from '../ngbd-table-complete/edit/table-edit/table-edit.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit, OnDestroy, EditRow, TableEdit {
  @ViewChild(NgbdTableCompleteComponent, { static: false })
  td: NgbdTableCompleteComponent;
  postionTap = 0;
  model = Clients.getNewClients();
  message;
  err;
  hedTable = ['الرقم', 'الاسم', 'الهاتف', 'العنوان'];
  info = [];

  public activeId = 1;
  public ngbnv1 = true;
  public ngbnv2 = false;
  Id = 'ClientsComponent';
  subscription: Subscription;

  constructor(
    public toastService: ToastService,
    private clientsServes: ClientsServes,
    private modalService: NgbModal,
    private heroService: HeroService,
    private config: NgbNavConfig
  ) {
    this.message = this.heroService.message;
    this.err = this.heroService.err.Clients;
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
      Clients.initClients(...model),
      this
    );
  }
  pushItem(model: any, modalN: any) {
    this.clientsServes.updateF(model.key, model).then(modalN.close);
  }
  checkItem(model: any) {
    if (model.stnumber) {
      this.showDanger(this.err.number);
    }
    if (model.stname) {
      this.showDanger(this.err.name);
    }
    if (model.stphone) {
      this.showDanger(this.err.phone);
    }
    if (model.staddress) {
      this.showDanger(this.err.address);
    }
  }
  deleteItem(key: any, modalN: any) {
    this.clientsServes.deleteF(key).then(modalN.close);
  }
  get This() {
    //  [This]='This'
    return this;
  }
  ngOnInit() {
    this.getClientsList();
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
    this.clientsServes.createClient(this.model, () => {
      this.model = Clients.getNewClients();
      this.showSuccessMessage(this.message.success.plus);
    });
  }

  getClientsList() {
   this.subscription =  this.clientsServes
      .getClientsList()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((clients) => {
        this.heroService.clients = clients;
        this.getClientsComponentInfo();
      });
  }

  getClientsComponentInfo() {
    this.info = [];
    this.heroService.clients.forEach((element) => {
      this.info.push([
        element.key,
        element.number,
        element.name,
        element.phone,
        element.address,
      ]);
    });

    if (this.td !== null && this.td !== undefined) {
      this.td.service.setup(this.info);
    }
    this.info.reverse();
    return this.info;
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
      const NgbdMCAC = this.modalService.open(NgbdModalConfirmAutofocusComponent);
      NgbdMCAC.componentInstance.cleareInformation(() => {
        this.model = Clients.getNewClients();
      }, 'العملاء');
    }
  }

  information() {
    this.modalService
      .open(AlertInfoComponent)
      .componentInstance.displayClints();
  }
}
