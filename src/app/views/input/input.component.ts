import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from 'src/app/hero/hero.service';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toasts/toast-service';
import { NgbdModalConfirmAutofocusComponent } from '../ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteComponent } from '../ngbd-table-complete/ngbd-table-complete.component';
import { map } from 'rxjs/operators';
import { InputServes } from './InputServes';
import { CategorysComponent } from '../categorys/categorys.component';
import { Inputs } from './Inputs';
import { AlertInfoComponent } from '../alert-info/alert-info.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @ViewChild(NgbdTableCompleteComponent, {static: false}) td: NgbdTableCompleteComponent;
  postionTap=0;
  model = Inputs.setInput();
  message=HeroService.message
  err=HeroService.err.Input;
  hedTable = ["رقم الشراء","المورد","التاريخ","المخزن","عرض"];
  info=[];
  Id="InputComponent";
  public activeId=1;
  public ngbnv1=true;
  public ngbnv2=false;
 
  constructor(public toastService: ToastService,
    private inputServes: InputServes, //fire
    private _modalService: NgbModal,
    config: NgbNavConfig) {
      config.destroyOnHide = true;
      config.roles = "tablist";
      HeroService.nvCategorysServes=this.inputServes;//fire
      NgbdTableCompleteComponent.callback=()=>{
        this.getInputComponentInfo();
      }
    
    }

  ngOnInit() {
    this.getCategorysList()
  }


  savaDAtaBase(dangerTpl) {
    console.log(dangerTpl)
    if(this.model.validateInput()){
        this.showSuccess();
    }else{
      if(this.model.stnumber)
      this.showDanger(dangerTpl[0])
    if(this.model.stdate)
      this.showDanger(dangerTpl[1])
    if(this.model.stthesupplier)
      this.showDanger(dangerTpl[2])
    if(this.model.stthestore)
      this.showDanger(dangerTpl[3])
    }
  }
  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
  }
  showSuccess() {
    this.toastService.toasts=[];
    this.inputServes.createInput(this.model);//firebase
    this.model.setInput(this.model);
    this.model=Inputs.setInput();
    this.getInputComponentInfo();
   // console.log(this.model.getClients());
   this.toastService.show(this.message.success.plus, { classname: 'bg-success text-light', delay: 3000 });
  }

  getInputComponentInfo(){
    console.log("yes yes")
    this.info=[];
    HeroService.input.forEach(element => {
      this.info.push([[
        element.number,
        element.thesupplier,
        element.date,
        element.thestore
      ],element.key]);
    });
    if(this.td !== null && this.td!==undefined)
    this.td.service.setup(this.info);

    this.info.reverse();
    return this.info
  }


  getCategorysList() {
    this.inputServes.getInputsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(input => {
     HeroService.input = input;
     this.getInputComponentInfo()
     console.log( HeroService.input);
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
      NgbdModalConfirmAutofocusComponent.setupInputComponent(()=>{
        this.model=Inputs.setInput();
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

  information(){
    this._modalService.open(AlertInfoComponent).componentInstance.displayInput()
   }

  setthesuppliers(){
   
    console.log(this.model.thesuppliers.length)
     if(this.model.thesuppliers.length==0)
          this.model.getSuppliers();
    console.log(this.model.thesuppliers)
  }
  setthestores(){
    if(this.model.thestores.length==0)
         this.model.getStores();
   console.log(this.model.thestores)
  }
  setitems(){
    if(this.model.items.length==0)
    this.model.getItems();
console.log(this.model.items)
  }
}

