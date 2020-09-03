import { Component, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { HeroService } from '../../hero/hero.service';
import { ToastService } from '../toasts/toast-service';
import { NgbdModalConfirmAutofocusComponent } from '../ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import { NgbActiveModal, NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteComponent } from '../ngbd-table-complete/ngbd-table-complete.component';
import { CategorysServes } from './CategorysServes';
import { map } from 'rxjs/operators';
import { Categorys } from './Categorys';
import { AlertInfoComponent } from '../alert-info/alert-info.component';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css']
})



export class CategorysComponent implements OnInit {
  @ViewChild(NgbdTableCompleteComponent, {static: false}) td: NgbdTableCompleteComponent;
  countries = Categorys.getCountries();
  model = Categorys.setCategorys();
  message=HeroService.message
  err=HeroService.err.Categorys;
  hedTable = ["الرقم","اسم الصنف","السعر","الدولة"];
  info=[];
  Id="CategorysComponent";
  postionTap=0;
 
  public activeId=1;
  public ngbnv1=true;
  public ngbnv2=false;
  constructor(public toastService: ToastService,
    private categorysServes: CategorysServes, //fire
    private _modalService: NgbModal,
    config: NgbNavConfig) {
      HeroService.nvCategorysServes=this.categorysServes;//fire
      config.destroyOnHide = true;
      config.roles = "tablist";
      NgbdTableCompleteComponent.callback=()=>{
        this.getCategorysComponentInfo(); //fire delete up
      }
    }

  newHero() {
    //this.model = new manufacturers(42, 'aa', '');
  }
  savaDAtaBase(dangerTpl) {
    if(this.model.validateInput()){
        this.showSuccess();
    }else{
      if(this.model.stnumber)
      this.showDanger(dangerTpl[0])
    if(this.model.stname)
      this.showDanger(dangerTpl[1])
    if(this.model.stsalary)
      this.showDanger(dangerTpl[2])
    if(this.model.stcountrie)
      this.showDanger(dangerTpl[3])
    }
  }
  ngOnInit() {
    this.getCategorysList(); //fire
  }

  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
  }
  showSuccess() {
    this.toastService.toasts=[];
    this.categorysServes.createCategory(this.model);//firebase
    this.model.setCategorys(this.model);
    this.model=Categorys.setCategorys();
    this.getCategorysComponentInfo();// firebase
    console.log(HeroService.categorys);
    this.toastService.show(this.message.success.plus, { classname: 'bg-success text-light', delay: 3000 });
  }

  getCategorysComponentInfo(){
    console.log("yes yes")
    this.info=[];
    HeroService.categorys.forEach(element => {
      this.info.push([[
        element.number,
        element.name,
        element.salary,
        element.countrie
      ],element.key]); //fire to class
    });
    if(this.td !== null && this.td!==undefined)
        this.td.service.setup(this.info);

    this.info.reverse();
    return this.info
  }

  getCategorysList() {
    this.categorysServes.getCategorysList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(categorys => {
     HeroService.categorys = categorys;
     this.getCategorysComponentInfo()
     console.log( HeroService.categorys);
    });
  }

  open() {
    if(this.postionTap==0){
      NgbdModalConfirmAutofocusComponent.setupCategorysComponent(()=>{
        this.model=Categorys.setCategorys();
      });
      this._modalService.open(NgbdModalConfirmAutofocusComponent);
    }
  }
  setpostion(pos){
    this.postionTap=pos;
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



  onNavChange(changeEvent: NgbNavChangeEvent) {
    //console.log("",changeEvent.nextId);
 
   }


   information(){
    this._modalService.open(AlertInfoComponent).componentInstance.displayCategory()
   }
}
