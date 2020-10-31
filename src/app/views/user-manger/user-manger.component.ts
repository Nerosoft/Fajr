import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-manger',
  templateUrl: './user-manger.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./user-manger.component.scss']
})
export class UserMangerComponent implements OnInit {
  @Input()callback
  @Input()state=false
  userName
  pass
  stuserName=false
  stpass=false
  finalPass=""
  constructor(public modal: NgbActiveModal) {

   }
   setError(){
    this.stuserName=true
    this.stpass=true
   }
  ngOnInit() {
  }

}
