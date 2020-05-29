import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeroService } from 'src/app/hero/hero.service';
import { NgbdModalConfirmAutofocusComponent } from 'src/app/views/ngbd-modal-confirm-autofocus/ngbd-modal-confirm-autofocus.component';
import { ToastService } from 'src/app/views/toasts/toast-service';
// import { CategorysComponent } from 'src/app/views/categorys/categorys.component';
import { Categorys } from 'src/app/views/categorys/Categorys';
import { Clients } from 'src/app/views/clients/Clients';
import { Stores } from 'src/app/views/stores/Stores';
import { Suppliers } from 'src/app/views/suppliers/Suppliers';
import { Inputs } from 'src/app/views/input/Inputs';
import { Outs } from 'src/app/views/output/Outs';



@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.css']
})
export class TableEditComponent implements OnInit {
  static model;
  static err;
  static Id;
  static nameId;
  static callback=[]

  constructor(public modalN: NgbActiveModal,
     public _modalService: NgbModal,
     public toastService: ToastService) { }

  ngOnInit() {
  }

  static setupTableEditComponent(Id,nameId,ID,callback){ 
    TableEditComponent.callback=[];
    TableEditComponent.model=null;
    TableEditComponent.nameId="";
      if(Id=="ClientsComponent"){
        TableEditComponent.Id=Id;
        TableEditComponent.nameId=nameId;
        let reaArraylindex=TableEditComponent.indexArray(HeroService.clients,ID)

        TableEditComponent.model =Clients.setClients();
        TableEditComponent.err=HeroService.err.Clients;

        TableEditComponent.model.number= HeroService.clients[reaArraylindex].number
        TableEditComponent.model.name= HeroService.clients[reaArraylindex].name
        TableEditComponent.model.phone= HeroService.clients[reaArraylindex].phone
        TableEditComponent.model.address= HeroService.clients[reaArraylindex].address

        TableEditComponent.callback.push((modalN,toastService)=>{
          HeroService.clients[reaArraylindex].name= TableEditComponent.model.name;
          HeroService.clients[reaArraylindex].phone= TableEditComponent.model.phone;
          HeroService.clients[reaArraylindex].address= TableEditComponent.model.address;
          HeroService.nvCategorysServes.updateF(HeroService.clients[reaArraylindex].key,HeroService.clients[reaArraylindex])
        
         toastService.show('success', { classname: 'bg-success text-light', delay: 10000 });
          modalN.close('Ok click');
         callback();
        })

        //-----------remove----------
        TableEditComponent.callback.push(( _modalService)=>{
          NgbdModalConfirmAutofocusComponent.setupRemoveClientsComponent(()=>{
            console.log("after delete " +reaArraylindex);
            HeroService.nvCategorysServes.deleteF(HeroService.clients[reaArraylindex].key);
            HeroService.clients=TableEditComponent.removeItemOnce(HeroService.clients,
            HeroService.clients[reaArraylindex]);
            console.log("delete" ,HeroService.clients)
            callback();
          },TableEditComponent.model.name);
        _modalService.open(NgbdModalConfirmAutofocusComponent);
        })
      

      }
      else if(Id=="CategorysComponent"){
        TableEditComponent.Id=Id;
        TableEditComponent.nameId=nameId;
        let reaArraylindex=TableEditComponent.indexArray(HeroService.categorys,ID)

        TableEditComponent.model =Categorys.setCategorys();
        HeroService.categorys[reaArraylindex];
        TableEditComponent.model.number= HeroService.categorys[reaArraylindex].number
        TableEditComponent.model.name= HeroService.categorys[reaArraylindex].name
        TableEditComponent.model.salary= HeroService.categorys[reaArraylindex].salary
        TableEditComponent.model.countrie= HeroService.categorys[reaArraylindex].countrie
        TableEditComponent.model.editCounts = Categorys.getCountries();
        TableEditComponent.err=HeroService.err.Categorys;
        TableEditComponent.callback.push((modalN,toastService)=>{
          HeroService.categorys[reaArraylindex].name= TableEditComponent.model.name;
          HeroService.categorys[reaArraylindex].salary= TableEditComponent.model.salary;
          HeroService.categorys[reaArraylindex].countrie= TableEditComponent.model.countrie;

          HeroService.nvCategorysServes.updateF(HeroService.categorys[reaArraylindex].key,
            HeroService.categorys[reaArraylindex])
          toastService.show('success', { classname: 'bg-success text-light', delay: 10000 });
          modalN.close('Ok click');
         callback();
        })

          //-----------remove----------
          TableEditComponent.callback.push(( _modalService)=>{
            NgbdModalConfirmAutofocusComponent.setupRemoveCategorysComponent(()=>{
              console.log("after delete " +reaArraylindex)
              HeroService.nvCategorysServes.deleteF(HeroService.categorys[reaArraylindex].key)
              HeroService.categorys=TableEditComponent.removeItemOnce(HeroService.categorys,
              HeroService.categorys[reaArraylindex]);
              console.log("delete" ,HeroService.categorys)
              callback();
            },TableEditComponent.model.name);
          _modalService.open(NgbdModalConfirmAutofocusComponent);
          })

      }
      else if(Id=="SuppliersComponent"){
        TableEditComponent.Id=Id;
        TableEditComponent.nameId=nameId;
        let reaArraylindex=TableEditComponent.indexArray(HeroService.suppliers,ID)
        TableEditComponent.model = Suppliers.setSuppliers()
        TableEditComponent.err=HeroService.err.Suppliers;

        TableEditComponent.model.number = HeroService.suppliers[reaArraylindex].number
        TableEditComponent.model.name = HeroService.suppliers[reaArraylindex].name
        TableEditComponent.model.phone = HeroService.suppliers[reaArraylindex].phone
        TableEditComponent.model.address = HeroService.suppliers[reaArraylindex].address

        TableEditComponent.callback.push((modalN,toastService)=>{
          HeroService.suppliers[reaArraylindex].name= TableEditComponent.model.name;
          HeroService.suppliers[reaArraylindex].phone= TableEditComponent.model.phone;
          HeroService.suppliers[reaArraylindex].address= TableEditComponent.model.address;
          HeroService.nvCategorysServes.updateF(HeroService.suppliers[reaArraylindex].key,
            HeroService.suppliers[reaArraylindex])
          toastService.show('success', { classname: 'bg-success text-light', delay: 10000 });
          modalN.close('Ok click');
         callback();
        })

        //-----------remove----------
        TableEditComponent.callback.push(( _modalService,toastService)=>{
          NgbdModalConfirmAutofocusComponent.setupRemoveSuppliersComponent(()=>{
            console.log("after delete " +reaArraylindex)
            HeroService.nvCategorysServes.deleteF(HeroService.suppliers[reaArraylindex].key)
            HeroService.suppliers=TableEditComponent.removeItemOnce(HeroService.suppliers,
            HeroService.suppliers[reaArraylindex]);
            console.log("delete" ,HeroService.suppliers)
            toastService.show('success', { classname: 'bg-success text-light', delay: 10000 });
            callback();
          },TableEditComponent.model.name);
        _modalService.open(NgbdModalConfirmAutofocusComponent);
        })
      

      }
      else if(Id=="StoresComponent"){
        TableEditComponent.Id=Id;
        TableEditComponent.nameId=nameId;
        let reaArraylindex=TableEditComponent.indexArray(HeroService.stores,ID)
        TableEditComponent.model = Stores.setStores()
        TableEditComponent.err=HeroService.err.Stores;
        

        TableEditComponent.model.number = HeroService.stores[reaArraylindex].number
        TableEditComponent.model.name =HeroService.stores[reaArraylindex].name
        TableEditComponent.model.storekeeper= HeroService.stores[reaArraylindex].storekeeper

        TableEditComponent.callback.push((modalN,toastService)=>{
          HeroService.stores[reaArraylindex].name= TableEditComponent.model.name;
          HeroService.stores[reaArraylindex].storekeeper= TableEditComponent.model.storekeeper;
          HeroService.nvCategorysServes.updateF(HeroService.stores[reaArraylindex].key,
            HeroService.stores[reaArraylindex])
          toastService.show('success', { classname: 'bg-success text-light', delay: 10000 });
          modalN.close('Ok click');
         callback();
        })

        //-----------remove----------
        TableEditComponent.callback.push(( _modalService,toastService)=>{
          NgbdModalConfirmAutofocusComponent.setupRemoveStoresComponent(()=>{
            console.log("after delete " +reaArraylindex)
            HeroService.nvCategorysServes.deleteF(HeroService.stores[reaArraylindex].key)
            HeroService.stores=TableEditComponent.removeItemOnce(HeroService.stores,
            HeroService.stores[reaArraylindex]);
            console.log("delete" ,HeroService.stores)
            toastService.show('success', { classname: 'bg-success text-light', delay: 10000 });
            callback();
          },TableEditComponent.model.name);
        _modalService.open(NgbdModalConfirmAutofocusComponent);
        })
      

      }
      else if(Id=="InputComponent"){
        TableEditComponent.Id=Id;
        TableEditComponent.nameId=nameId;
        let reaArraylindex=TableEditComponent.indexArray(HeroService.input,ID)
        TableEditComponent.model = Inputs.setInput();
        TableEditComponent.err=HeroService.err.Input;
        
        TableEditComponent.model.number= HeroService.input[reaArraylindex].number
        TableEditComponent.model.date= HeroService.input[reaArraylindex].date
        TableEditComponent.model.thesupplier= HeroService.input[reaArraylindex].thesupplier
        TableEditComponent.model.thestore= HeroService.input[reaArraylindex].thestore

        TableEditComponent.model.item= HeroService.input[reaArraylindex].item
        TableEditComponent.model.salary= HeroService.input[reaArraylindex].salary
        TableEditComponent.model.quantity= HeroService.input[reaArraylindex].quantity
        TableEditComponent.model.total= HeroService.input[reaArraylindex].total
        TableEditComponent.model.notes= HeroService.input[reaArraylindex].notes

        TableEditComponent.callback.push((modalN,toastService)=>{

          HeroService.input[reaArraylindex].date= TableEditComponent.model.date;
          HeroService.input[reaArraylindex].thesupplier= TableEditComponent.model.thesupplier;
          HeroService.input[reaArraylindex].thestore= TableEditComponent.model.thestore;

          HeroService.input[reaArraylindex].item= TableEditComponent.model.item;
          HeroService.input[reaArraylindex].salary= TableEditComponent.model.salary;
          HeroService.input[reaArraylindex].quantity= TableEditComponent.model.quantity;
          HeroService.input[reaArraylindex].total= TableEditComponent.model.getTotal();
          HeroService.input[reaArraylindex].notes= TableEditComponent.model.notes;
          HeroService.nvCategorysServes.updateF(HeroService.input[reaArraylindex].key,
            HeroService.input[reaArraylindex])
          toastService.show('success', { classname: 'bg-success text-light', delay: 10000 });
          modalN.close('Ok click');
         callback();
        })

        //-----------remove----------
        TableEditComponent.callback.push(( _modalService,toastService)=>{
          NgbdModalConfirmAutofocusComponent.setupRemoveInputComponent(()=>{
            console.log("after delete " +reaArraylindex)
            HeroService.nvCategorysServes.deleteF(HeroService.input[reaArraylindex].key)
            HeroService.input=TableEditComponent.removeItemOnce(HeroService.input,
            HeroService.input[reaArraylindex]);
            console.log("delete" ,HeroService.input)
            toastService.show('success', { classname: 'bg-success text-light', delay: 10000 });
            callback();
          },TableEditComponent.model.thesupplier);
        _modalService.open(NgbdModalConfirmAutofocusComponent);
        })
      

      }
      else if(Id=="OutputComponent"){
        TableEditComponent.Id=Id;
        TableEditComponent.nameId=nameId;
        let reaArraylindex=TableEditComponent.indexArray(HeroService.out,ID)
        TableEditComponent.err=HeroService.err.Out;
        TableEditComponent.model = Outs.setOut()

        TableEditComponent.model.number=HeroService.out[reaArraylindex].number
        TableEditComponent.model.date=HeroService.out[reaArraylindex].date
        TableEditComponent.model.theclient=HeroService.out[reaArraylindex].theclient



        TableEditComponent.model.item= HeroService.out[reaArraylindex].item
        TableEditComponent.model.salary= HeroService.out[reaArraylindex].salary
        TableEditComponent.model.quantity= HeroService.out[reaArraylindex].quantity
        TableEditComponent.model.total= HeroService.out[reaArraylindex].total
        TableEditComponent.model.notes= HeroService.out[reaArraylindex].notes

        TableEditComponent.callback.push((modalN,toastService)=>{

          HeroService.out[reaArraylindex].date= TableEditComponent.model.date;
          HeroService.out[reaArraylindex].theclient= TableEditComponent.model.theclient;
       

          HeroService.out[reaArraylindex].item= TableEditComponent.model.item;
          //HeroService.out[reaArraylindex].salary= TableEditComponent.model.salary;
          HeroService.out[reaArraylindex].quantity= TableEditComponent.model.quantity;
          HeroService.out[reaArraylindex].total= TableEditComponent.model.getTotal();
          HeroService.out[reaArraylindex].notes= TableEditComponent.model.notes;
          HeroService.nvCategorysServes.updateF(HeroService.out[reaArraylindex].key,
            HeroService.out[reaArraylindex])
          toastService.show('success', { classname: 'bg-success text-light', delay: 10000 });
          modalN.close('Ok click');
         callback();
        })

        //-----------remove----------
        TableEditComponent.callback.push(( _modalService,toastService)=>{
          NgbdModalConfirmAutofocusComponent.setupRemoveOutComponent(()=>{
            console.log("after delete " +reaArraylindex)
            HeroService.nvCategorysServes.deleteF(HeroService.out[reaArraylindex].key)
            HeroService.out=TableEditComponent.removeItemOnce(HeroService.out,
            HeroService.out[reaArraylindex]);
            console.log("delete" ,HeroService.out)
            toastService.show('success', { classname: 'bg-success text-light', delay: 10000 });
            callback();
          },TableEditComponent.model.theclient);
        _modalService.open(NgbdModalConfirmAutofocusComponent);
        })
      

      }
  }

  get model(){return TableEditComponent.model}
  get err(){return TableEditComponent.err}
  get nameId(){return TableEditComponent.nameId}
  get Id(){return TableEditComponent.Id}
  ok(dangerTpl){
    if(this.model.validateInput()){
     TableEditComponent.callback[0](this.modalN,this.toastService);
    }else
      this.showDanger(dangerTpl)
  }
  deletethis(){
    TableEditComponent.callback[1](this._modalService,this.toastService);
    this.modalN.close('Ok click');
  
}
   static removeItemOnce(arr:any, item):[] { 
      var index = arr.indexOf(item);
      if (index > -1) {
          arr.splice(index, 1);
      }
      return arr;
  }
   static indexArray(arr:any, value):number { 
    let i = 0;
    while (i < arr.length) {
        if(arr[i].key === value) {
          return i;
        } else {
            ++i;
        }
    }
    return i;
}
 showDanger(dangerTpl) {
  this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
}

onChange(item){
  this.model.salary=this.model.salaryOfItem[item.target.selectedIndex]
  console.log(item.target.selectedIndex);
}


static setupTableShowComponent(ID,Id){
  TableEditComponent.callback=[];
  TableEditComponent.model=null;
  TableEditComponent.nameId="";
  if(Id=="InputComponent"){
    TableEditComponent.Id=Id+"/show";
    TableEditComponent.nameId="شاشة المشتريات";

    let reaArraylindex=TableEditComponent.indexArray(HeroService.input,ID)
    TableEditComponent.model = HeroService.input[reaArraylindex];
  }
  else if(Id=="OutputComponent"){
    TableEditComponent.Id=Id+"/show";
    TableEditComponent.nameId="شاشة المبيعات";
    let reaArraylindex=TableEditComponent.indexArray(HeroService.out,ID)
    TableEditComponent.model = HeroService.out[reaArraylindex];
  }
}


}
