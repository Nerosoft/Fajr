import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-info',
  templateUrl: './alert-info.component.html',
  styleUrls: ['./alert-info.component.css']
})
export class AlertInfoComponent implements OnInit {
  @Input()id
  @Input()iformation
  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

  displayCategory(){
    this.id="الاصناف"
    this.iformation="هنا يتم تسجيل اصناف التي تتاجر الشركه فيها"
  }
  displayClints(){
    this.id="العملاء"
    this.iformation="هنا يتم تسجيل العملاء التي تبيع لها الشركه"
  }
  displayOut(){
    this.id="المبيعات"
    this.iformation="هنا يتم تسجيل المبيعات التي قامت الشركه ببيعها"
  }
  displayInput(){
    this.id="المشترايات"
    this.iformation="هنا يتم تسجيل الاصناف التي قامت الشركه بشرائها"
  }
  displaySupplier(){
    this.id="الموردين"
    this.iformation="هنا يتم تسجيل الاموردين التي تتعامل معهم الشركه"
  }
  displaystores(){
    this.id="المخازن"
    this.iformation="هنا يتم تسجيل بيانات المخازن الخاصه بالشركه"
  }
  displayBranch(){
    this.id="الفروع"
    this.iformation="هنا يتم تسجيل بيانات حسابات الفروع الخاصه بالشركه"
  }
}


