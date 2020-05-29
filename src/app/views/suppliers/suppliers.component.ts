//SuppliersComponent
import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from 'src/app/hero/hero.service';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toasts/toast-service';
import { NgbdModalConfirmAutofocusComponent } from '../ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteComponent } from '../ngbd-table-complete/ngbd-table-complete.component';
import { SuppliersServes } from './SuppliersServes';
import { map } from 'rxjs/operators';
import { CategorysComponent } from '../categorys/categorys.component';
import { Suppliers } from './Suppliers';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})


export class SuppliersComponent implements OnInit {
  @ViewChild(NgbdTableCompleteComponent, {static: false}) td: NgbdTableCompleteComponent;
  postionTap=0;
  model = Suppliers.setSuppliers();
  err=HeroService.err.Suppliers;
  hedTable = ["الرقم","الاسم","الهاتف","العنوان"];
  info=[];
  Id="SuppliersComponent";
  public activeId=1;
  public ngbnv1=true;
  public ngbnv2=false;
  constructor(public toastService: ToastService,
    private suppliersServes: SuppliersServes,
    private _modalService: NgbModal,
    config: NgbNavConfig) {
      config.destroyOnHide = true;
      config.roles = "tablist";
      HeroService.nvCategorysServes=this.suppliersServes;
      NgbdTableCompleteComponent.callback=()=>{
        this.getSuppliersComponentInfo();
        
      }
    
    }

  ngOnInit() {
    this.getSuppliersList();
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
    this.suppliersServes.createSuppliers(this.model);//firebase
    this.model.setSuppliersComponent(this.model);
    this.model=Suppliers.setSuppliers();
    this.getSuppliersComponentInfo();
    this.toastService.show('success', { classname: 'bg-success text-light', delay: 10000 });
  }



  getSuppliersList() {
    this.suppliersServes.getSuppliersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(suppliers => {
     HeroService.suppliers = suppliers;
     this.getSuppliersComponentInfo()
     console.log( HeroService.suppliers);
    });
  }


  getSuppliersComponentInfo(){
    this.info=[];
    HeroService.suppliers.forEach(element => {
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
   //console.log("xxxxxxxxxxxxxxxx",changeEvent.nextId);

  }

  setpostion(pos){
    this.postionTap=pos;
  }
  open() {
      if(this.postionTap==0){
      NgbdModalConfirmAutofocusComponent.setupSuppliersComponent(()=>{
        this.model=Suppliers.setSuppliers();
      });
      this._modalService.open(NgbdModalConfirmAutofocusComponent);
    } if(this.postionTap==1){

    }
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




  qus(){

  }
}

