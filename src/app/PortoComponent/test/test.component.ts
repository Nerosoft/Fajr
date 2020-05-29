import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { emit } from 'cluster';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  //@ViewChild('navs', {static: false}) nav: TestComponent;

  yes="test works!"
  constructor() { 

  }
  public changeYes(){
    this.yes="noooooooooooooooo";
  }
  ngOnInit() {

    }


}

