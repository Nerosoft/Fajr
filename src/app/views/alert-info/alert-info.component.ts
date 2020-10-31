import { HeroService } from './../../hero/hero.service';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-info',
  templateUrl: './alert-info.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./alert-info.component.scss']
})
export class AlertInfoComponent implements OnInit {

  about:any = '';
  title = '';
  iformation = '';
  constructor(
    public modal: NgbActiveModal,
    public heroService: HeroService ) {

  }

  ngOnInit() {
  }

  display(id) {
    this.about = this.heroService.lang.about;
    this.iformation = this.heroService.lang.compoMessage[id].iformation;
    this.title = this.heroService.lang[id];
  }

}


