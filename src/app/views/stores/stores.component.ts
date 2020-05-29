import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from 'src/app/hero/hero.service';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toasts/toast-service';
import { NgbdModalConfirmAutofocusComponent } from '../ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteComponent } from '../ngbd-table-complete/ngbd-table-complete.component';
import { map } from 'rxjs/operators';
import { StoresServes } from './storesServes';
import { CategorysComponent } from '../categorys/categorys.component';
import { Stores } from './Stores';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  @ViewChild(NgbdTableCompleteComponent, {static: false}) td: NgbdTableCompleteComponent;
  postionTap=0;
  model = Stores.setStores();
  err=HeroService.err.Stores;
  hedTable = ["رقم المخزن","اسم المخزن","امين المخزن"];
  info=[];
  Id="StoresComponent";
  public activeId=1;
  public ngbnv1=true;
  public ngbnv2=false;
 
 
  constructor(public toastService: ToastService,
    private storesServes: StoresServes, //fire
    private _modalService: NgbModal,
    config: NgbNavConfig) {
      config.destroyOnHide = true;
      config.roles = "tablist";
      HeroService.nvCategorysServes=this.storesServes;//fire
      NgbdTableCompleteComponent.callback=()=>{
      this.getStoresComponentInfo()
      }
    
    }

  ngOnInit() {
    this.getCategorysList();
  }


  savaDAtaBase(dangerTpl) {
    if(this.model.validateInput()){
        this.showSuccess();
    }else{
      if(this.model.stnumber)
      this.showDanger(dangerTpl[0])
    if(this.model.stname)
      this.showDanger(dangerTpl[1])
    if(this.model.ststorekeeper)
      this.showDanger(dangerTpl[2])
    }
  }
  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
  }
  showSuccess() {
    this.toastService.toasts=[];
    this.storesServes.createStore(this.model);//firebase
    this.model.setStores(this.model);
    this.model=Stores.setStores();
    this.getStoresComponentInfo();
   // console.log(this.model.getClients());
    this.toastService.show('success', { classname: 'bg-success text-light', delay: 10000 });
  }

  getStoresComponentInfo(){
    this.info=[];
    HeroService.stores.forEach(element => {
      this.info.push([[
        element.number,
        element.name,
        element.storekeeper
      ],element.key]);
    });
   

    if(this.td !== null && this.td!==undefined)
      this.td.service.setup(this.info);

    this.info.reverse();
    return this.info
  }

  getCategorysList() {
    this.storesServes.getStoresList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(stores => {
     HeroService.stores = stores;
     this.getStoresComponentInfo()
     console.log( HeroService.stores);
    });
  }



  onNavChange(changeEvent: NgbNavChangeEvent) {
   //console.log("xxxxxxxxxxxxxxxx",changeEvent.nextId);

  }

  setpostion(pos){
    this.postionTap=pos;
  }
  open() {
      if(this.postionTap==0){
      NgbdModalConfirmAutofocusComponent.setupStoresComponent(()=>{
        this.model=Stores.setStores();
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


