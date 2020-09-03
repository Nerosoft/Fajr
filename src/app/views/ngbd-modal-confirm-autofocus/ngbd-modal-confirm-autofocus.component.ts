import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">{{header}}</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>{{mes1}} <span class="text-primary">"{{mes2}}"</span>{{header}}؟</strong></p>
    <p>{{mes3}}
    <span class="text-danger">{{mes4}}</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="ok()">Ok</button>
  </div>
  `,
  styleUrls: ['./ngbd-modal-confirm-autofocus.component.css']
})
export class NgbdModalConfirmAutofocusComponent implements OnInit {
  static header:string
  static mes1:String
  static mes2:string
  static mes3:string
  static mes4:string
  static callback
  constructor(public modal: NgbActiveModal) {}

  ngOnInit() {
  }

  public static setupCategorysComponent(callback){
    NgbdModalConfirmAutofocusComponent.header="الاصناف";
    NgbdModalConfirmAutofocusComponent.mes1="هل انت متأكد من اجراء";
    NgbdModalConfirmAutofocusComponent.mes2="مسح شاشة";
    NgbdModalConfirmAutofocusComponent.mes3="سيتم تنظيف الشاشة بالكامل.";
    NgbdModalConfirmAutofocusComponent.mes4="هذه العملية لا يمكن الرجوع فيها.";
    NgbdModalConfirmAutofocusComponent.callback=callback;
  }

  public static setupRemoveCategorysComponent(callback,name){
    NgbdModalConfirmAutofocusComponent.header="بيانات الاصناف";
    NgbdModalConfirmAutofocusComponent.mes1="هل انت متأكد من اجراء";
    NgbdModalConfirmAutofocusComponent.mes2="حذف صنف" + name;
    NgbdModalConfirmAutofocusComponent.mes3="سيتم اجراء العملية.";
    NgbdModalConfirmAutofocusComponent.mes4="هذه العملة لا يمكن الرجوع فيها.";
    NgbdModalConfirmAutofocusComponent.callback=callback;
  }



  public static setupClientsComponent(callback){
    NgbdModalConfirmAutofocusComponent.header="بيانات العملاء";
    NgbdModalConfirmAutofocusComponent.mes1="هل انت متأكد من اجراء";
    NgbdModalConfirmAutofocusComponent.mes2="مسح شاشة";
    NgbdModalConfirmAutofocusComponent.mes3="سيتم تنظيف الشاشة بالكامل.";
    NgbdModalConfirmAutofocusComponent.mes4="هذه العملة لا يمكن الرجوع فيها.";
    NgbdModalConfirmAutofocusComponent.callback=callback;
  }
  public static setupRemoveClientsComponent(callback,name){
    NgbdModalConfirmAutofocusComponent.header="بيانات العملاء";
    NgbdModalConfirmAutofocusComponent.mes1="هل انت متأكد من اجراء";
    NgbdModalConfirmAutofocusComponent.mes2="حذف عميل" + name;
    NgbdModalConfirmAutofocusComponent.mes3="سيتم اجراء العملية.";
    NgbdModalConfirmAutofocusComponent.mes4="هذه العملة لا يمكن الرجوع فيها.";
    NgbdModalConfirmAutofocusComponent.callback=callback;
  }



  public static setupSuppliersComponent(callback){
    NgbdModalConfirmAutofocusComponent.header="بيانات الموردين";
    NgbdModalConfirmAutofocusComponent.mes1="هل انت متأكد من اجراء";
    NgbdModalConfirmAutofocusComponent.mes2="مسح شاشة";
    NgbdModalConfirmAutofocusComponent.mes3="سيتم تنظيف الشاشة بالكامل.";
    NgbdModalConfirmAutofocusComponent.mes4="هذه العملة لا يمكن الرجوع فيها.";
    NgbdModalConfirmAutofocusComponent.callback=callback;
  }
  public static setupRemoveSuppliersComponent(callback,name){
    NgbdModalConfirmAutofocusComponent.header="بيانات الموردين";
    NgbdModalConfirmAutofocusComponent.mes1="هل انت متأكد من اجراء";
    NgbdModalConfirmAutofocusComponent.mes2="حذف عميل" + name;
    NgbdModalConfirmAutofocusComponent.mes3="سيتم اجراء العملية.";
    NgbdModalConfirmAutofocusComponent.mes4="هذه العملة لا يمكن الرجوع فيها.";
    NgbdModalConfirmAutofocusComponent.callback=callback;
  }



  public static setupStoresComponent(callback){
    NgbdModalConfirmAutofocusComponent.header="بيانات المخزن";
    NgbdModalConfirmAutofocusComponent.mes1="هل انت متأكد من اجراء";
    NgbdModalConfirmAutofocusComponent.mes2="مسح شاشة";
    NgbdModalConfirmAutofocusComponent.mes3="سيتم تنظيف الشاشة بالكامل.";
    NgbdModalConfirmAutofocusComponent.mes4="هذه العملة لا يمكن الرجوع فيها.";
    NgbdModalConfirmAutofocusComponent.callback=callback;
  }
  public static setupRemoveStoresComponent(callback,name){
    NgbdModalConfirmAutofocusComponent.header="بيانات المخزن";
    NgbdModalConfirmAutofocusComponent.mes1="هل انت متأكد من اجراء";
    NgbdModalConfirmAutofocusComponent.mes2="حذف مخزن" + name;
    NgbdModalConfirmAutofocusComponent.mes3="سيتم اجراء العملية.";
    NgbdModalConfirmAutofocusComponent.mes4="هذه العملة لا يمكن الرجوع فيها.";
    NgbdModalConfirmAutofocusComponent.callback=callback;
  }


  public static setupInputComponent(callback){
    NgbdModalConfirmAutofocusComponent.header="بيانات المشتريات";
    NgbdModalConfirmAutofocusComponent.mes1="هل انت متأكد من اجراء";
    NgbdModalConfirmAutofocusComponent.mes2="مسح شاشة";
    NgbdModalConfirmAutofocusComponent.mes3="سيتم تنظيف الشاشة بالكامل.";
    NgbdModalConfirmAutofocusComponent.mes4="هذه العملة لا يمكن الرجوع فيها.";
    NgbdModalConfirmAutofocusComponent.callback=callback;
  }
  public static setupRemoveInputComponent(callback,name){
    NgbdModalConfirmAutofocusComponent.header="بيانات المشتريات";
    NgbdModalConfirmAutofocusComponent.mes1="هل انت متأكد من اجراء";
    NgbdModalConfirmAutofocusComponent.mes2="حذف عملية شراء" + name;
    NgbdModalConfirmAutofocusComponent.mes3="سيتم اجراء العملية.";
    NgbdModalConfirmAutofocusComponent.mes4="هذه العملة لا يمكن الرجوع فيها.";
    NgbdModalConfirmAutofocusComponent.callback=callback;
  }



  public static setupOutComponent(callback){
    NgbdModalConfirmAutofocusComponent.header="بيانات المبيعات";
    NgbdModalConfirmAutofocusComponent.mes1="هل انت متأكد من اجراء";
    NgbdModalConfirmAutofocusComponent.mes2="مسح شاشة";
    NgbdModalConfirmAutofocusComponent.mes3="سيتم تنظيف الشاشة بالكامل.";
    NgbdModalConfirmAutofocusComponent.mes4="هذه العملة لا يمكن الرجوع فيها.";
    NgbdModalConfirmAutofocusComponent.callback=callback;
  }
  public static setupRemoveOutComponent(callback,name){
    NgbdModalConfirmAutofocusComponent.header="بيانات المبيعات";
    NgbdModalConfirmAutofocusComponent.mes1="هل انت متأكد من اجراء";
    NgbdModalConfirmAutofocusComponent.mes2="حذف عملية بيع" + name;
    NgbdModalConfirmAutofocusComponent.mes3="سيتم اجراء العملية.";
    NgbdModalConfirmAutofocusComponent.mes4="هذه العملة لا يمكن الرجوع فيها.";
    NgbdModalConfirmAutofocusComponent.callback=callback;
  }



  public static setupRemoveBranchsComponent(callback,name){
    NgbdModalConfirmAutofocusComponent.header="بيانات الافرع";
    NgbdModalConfirmAutofocusComponent.mes1="هل انت متأكد من اجراء";
    NgbdModalConfirmAutofocusComponent.mes2="حذف فرع" + name;
    NgbdModalConfirmAutofocusComponent.mes3="سيتم اجراء العملية.";
    NgbdModalConfirmAutofocusComponent.mes4="هذه العملة لا يمكن الرجوع فيها.";
    NgbdModalConfirmAutofocusComponent.callback=callback;
  }



  ok(){
    NgbdModalConfirmAutofocusComponent.callback();
    this.modal.close('Ok click');
  }
  get header() {
    return  NgbdModalConfirmAutofocusComponent.header
  }
  get mes1() {
    return   NgbdModalConfirmAutofocusComponent.mes1
  }
  get mes2() {
    return  NgbdModalConfirmAutofocusComponent.mes2
  }
  get mes3() {
    return  NgbdModalConfirmAutofocusComponent.mes3
  }
  get mes4() {
    return  NgbdModalConfirmAutofocusComponent.mes4
  }
}
