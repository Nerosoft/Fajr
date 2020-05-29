import {  OnInit, Component, Directive, Input, ViewChild } from '@angular/core';
import { NgImageSliderModule, NgImageSliderComponent } from 'ng-image-slider';
import { HeroService } from '../../hero/hero.service';
import { TestComponent } from '../test/test.component';
import { Customer } from 'src/app/Customer';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/CustomerService';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {



  title="TypeScript"

  newcustomer: Customer = new Customer();
  submitted = false;

  customers: any;
  @Input() customer: Customer;
 itemValue = '';
 items: Observable<any[]>;
  constructor(public db: AngularFireDatabase,private customerService: CustomerService) { 

   this.items = db.list('items').valueChanges();
  }
  ngOnInit(): void {
    this.getCustomersList();
  }
  



  // onSubmit() {
  //    this.db.list('items').push({ content: this.itemValue});
  //    this.itemValue = '';
  // }





  getCustomersList() {
    this.customerService.getCustomersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(customers => {
      this.customers = customers;
    });
  }

  updateActive(isActive: boolean) {
    this.customerService
      .updateCustomer(this.customer.key, { active: isActive })
      .catch(err => console.log(err));
  }
 
  deleteCustomer(key) {
    this.customerService
      .deleteCustomer(key)
      .catch(err => console.log(err));
  }


  deleteCustomers() {
    this.customerService.deleteAll().catch(err => console.log(err));
  }



  
  newCustomer(): void {
    this.submitted = false;
    this.newcustomer = new Customer();
  }
 
  save() {
    this.customerService.createCustomer(this.newcustomer);
    this.newcustomer = new Customer();
  }
 
  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
