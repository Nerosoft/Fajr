import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router) { 
   // console.log("aaa " +this.route.url); 
  }

  ngOnInit() {
  }


  sendDataEffect(){

    let dom:HTMLElement=document.getElementById("progloadeid");
    let loadeprog=5;
    dom.style.width=loadeprog+"%";
    dom.parentElement.style.display = 'flex';
    let timer= setInterval(function(){
      loadeprog+=7;
      dom.style.width=loadeprog+"%";
      console.log( dom.style.width);
      if(loadeprog>=120){
       clearInterval(timer);
       dom.parentElement.style.display = 'none';
       dom.style.width=0+"%";
       loadeprog=5
      }
    },100);
  }

}
