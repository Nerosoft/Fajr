import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from 'src/app/hero/hero.service';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toasts/toast-service';
import { NgbdModalConfirmAutofocusComponent } from '../ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteComponent } from '../ngbd-table-complete/ngbd-table-complete.component';
import { ClientsServes } from './ClientsServes';
import { map } from 'rxjs/operators';
import { CategorysComponent } from '../categorys/categorys.component';
import { Clients } from './Clients';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  @ViewChild(NgbdTableCompleteComponent, {static: false}) td: NgbdTableCompleteComponent;
  postionTap=0;
  model = Clients.setClients();
  err=HeroService.err.Clients;
  hedTable = ["الرقم","الاسم","الهاتف","العنوان"];
  info=[];
 
 public activeId=1;
 public ngbnv1=true;
 public ngbnv2=false;
  Id="ClientsComponent";
  static nvClientsServes:ClientsServes
  constructor(public toastService: ToastService,
    private clientsServes: ClientsServes,
    private _modalService: NgbModal,
    config: NgbNavConfig) {
      config.destroyOnHide = true;
      config.roles = "tablist";
      HeroService.nvCategorysServes=this.clientsServes;
      NgbdTableCompleteComponent.callback=()=>{
       
        this.getClientsComponentInfo();

      // this.info=[]=this.getClientsComponentInfo();
      //  this.td.service.setup(this.info)
      //   console.log("xtxtxtxtx")
        
      }
    
    }

  ngOnInit() {
  this.getClientsList();
  }


  savaDAtaBase(dangerTpl) {
    if(this.model.validateInput()){
        this.showSuccess();
    }else{
      if(this.model.stnumber)
      this.showDanger(dangerTpl[0])
    if(this.model.stname)
      this.showDanger(dangerTpl[1])
    if(this.model.stphone)
      this.showDanger(dangerTpl[2])
    if(this.model.staddress)
      this.showDanger(dangerTpl[3])
    }
  }
  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
  }
  showSuccess() {
    this.toastService.toasts=[];
    this.clientsServes.createClient(this.model);//firebase
    this.model.setClients(this.model);
    this.model=Clients.setClients();
    this.getClientsComponentInfo();
   // console.log(this.model.getClients());
    this.toastService.show('success', { classname: 'bg-success text-light', delay: 10000 });
  }


  getClientsList() {
    this.clientsServes.getClientsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(clients => {
     HeroService.clients = clients;
     this.getClientsComponentInfo()
     console.log( HeroService.clients);
    });
  }

  getClientsComponentInfo(){
    this.info=[];
    HeroService.clients.forEach(element => {
      this.info.push([[
        element.number,
        element.name,
        element.phone,
        element.address
      ],element.key]);
    });

    if(this.td !== null && this.td!==undefined)
    this.td.service.setup(this.info);

    this.info.reverse();
    return this.info
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
   console.log("xxxxxxxxxxxxxxxx",changeEvent.nextId);
   
  }

  setpostion(pos){

  }

  setnav(vn){
    this.activeId=vn;
    if(vn==1) {
      this.ngbnv1=true;
      this.ngbnv2=false;
    }
    else if(vn==2) {
      this.ngbnv2=true;
      this.ngbnv1=false;
    }
    
  }

  open() {
      if(this.postionTap==0){
      NgbdModalConfirmAutofocusComponent.setupClientsComponent(()=>{
        this.model=Clients.setClients();
      });
      this._modalService.open(NgbdModalConfirmAutofocusComponent);
    } if(this.postionTap==1){

    }
  }

  qus(){

  //   this.info.push(  [
  //     55,
  //     'prince',
  //     'f/f3/Flag_of_Russia.svg',
  //      17075200,
  //      146989754
  //   ]);
  //  this.info.reverse();
  // //  this.td.service.setup();
  //   console.log("tmaaaaaa",this.info)
  }
}

