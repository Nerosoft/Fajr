import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from 'src/app/hero/hero.service';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toasts/toast-service';
import { NgbdModalConfirmAutofocusComponent } from '../ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteComponent } from '../ngbd-table-complete/ngbd-table-complete.component';
import { OutServes } from './OutServes';
import { CategorysComponent } from '../categorys/categorys.component';
import { map } from 'rxjs/operators';
import { Outs } from './Outs';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {
  @ViewChild(NgbdTableCompleteComponent, {static: false}) td: NgbdTableCompleteComponent;
  postionTap=0;
  model = Outs.setOut();
  err=HeroService.err.Out;
  hedTable = ["رقم البيع","العميل","التاريخ","عرض"];
  info=[];
  Id="OutputComponent";
  public activeId=1;
  public ngbnv1=true;
  public ngbnv2=false;
  constructor(public toastService: ToastService,
    private outServes: OutServes, //fire
    private _modalService: NgbModal,
    config: NgbNavConfig) {
      config.destroyOnHide = true;
      config.roles = "tablist";
      HeroService.nvCategorysServes=this.outServes;//fire
      NgbdTableCompleteComponent.callback=()=>{
        this.getInputComponentInfo();
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
    if(this.model.stdate)
      this.showDanger(dangerTpl[1])
    if(this.model.sttheclient)
      this.showDanger(dangerTpl[2])
    }
  }
  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
  }
  showSuccess() {
    this.toastService.toasts=[];
    this.outServes.createOut(this.model);//firebase
    this.model.setInput(this.model);
    this.model=Outs.setOut();
    this.getInputComponentInfo();
   // console.log(this.model.getClients());
    this.toastService.show('success', { classname: 'bg-success text-light', delay: 10000 });
  }

  getInputComponentInfo(){
    this.info=[];
    HeroService.out.forEach(element => {
      this.info.push([[
        element.number,
        element.theclient,
        element.date
      ],element.key]);
    });

    if(this.td !== null && this.td!==undefined)
    this.td.service.setup(this.info);

    this.info.reverse();
    return this.info
  }


  getCategorysList() {
    this.outServes.getOutsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(out => {
     HeroService.out = out;
     this.getInputComponentInfo()
     console.log( HeroService.out);
    });
  }


  onNavChange(changeEvent: NgbNavChangeEvent) {
   //console.log("xxxxxxxxxxxxxxxx",changeEvent.nextId);

  }
  onChange(item){
    this.model.salary=this.model.salaryOfItem[item.target.selectedIndex]
    console.log(item.target.selectedIndex);
  }
  setpostion(pos){
    this.postionTap=pos;
  }
  open() {
      if(this.postionTap==0){
      NgbdModalConfirmAutofocusComponent.setupOutComponent(()=>{
        this.model=Outs.setOut();
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

  setClintes(){
    if(this.model.theclients.length==0)
       this.model.getclient();
      console.log(this.model.theclients)
  }

  setitems(){
    if(this.model.items.length==0)
       this.model.getItems();
      console.log(this.model.items)
  }

}
