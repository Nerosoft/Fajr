import { Component,OnInit, ViewChild, Directive, Input, ElementRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})



export class NavBarComponent implements OnInit {
  public isMenuCollapsed = true;
  shouldShow = true;
  constructor(private route: Router,private elRef:ViewContainerRef) { 
   // this.sendDataEffect();
  }

  ngOnInit() {
    this.route.events.subscribe((val:NavigationEnd) => {
      // see also 
      //  console.log(val.url );
       
       if(val.url!=undefined)
        if(val.url=="/"||val.url=="/Login"){
          console.log(true +"|"+val.url); 
          this.shouldShow =false;
        }else{
          console.log(false +"|"+val.url); 
          this.shouldShow =true;
        }
  });

  }



  sendDataEffect(){
    let dom:HTMLElement=document.getElementById("progloadeid");
    let loadeprog=5;
    dom.style.width=0+"%";
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
