import { Component,OnInit, ViewChild, Directive, Input, ElementRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserPassComponent } from '../user-pass/user-pass.component';
import { LoginComponent } from '../login/login.component';
import { HeroService } from 'src/app/hero/hero.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})



export class NavBarComponent implements OnInit {
  phrases=["منظومة الشركه","م.احمد","م.خالد","م.عبدالله","م.ممدوح","م.نهي","م.ابراهيم"]
  colores=[true,false,false,false,false,false,false]
  public isMenuCollapsed = true
  branch=true
  shouldShow = true;
  constructor(private route: Router,
    private elRef:ViewContainerRef,
    private _modalService: NgbModal,) { 
   // this.sendDataEffect();
  }

  ngOnInit() {
    this.route.events.subscribe((val:NavigationEnd) => {
      // see also 
      //  console.log(val.url );
       
       if(val.url!=undefined)
        if(val.url=="/"||val.url.includes("/Login")){
          if(val.url.includes("/Login/")) this.branch=false
          this.shouldShow =false;
        }else{
          this.shouldShow =true;
        }
  });
  this.setclock(this)
  }



  sendDataEffect(){
    let dom:HTMLElement=document.getElementById("progloadeid");
    let loadeprog=5;
    dom.style.width=0+"%";
    dom.parentElement.style.display = 'flex';
    let timer= setInterval(function(){
      loadeprog+=7;
      dom.style.width=loadeprog+"%";
      if(loadeprog>=120){
       clearInterval(timer);
       dom.parentElement.style.display = 'none';
       dom.style.width=0+"%";
       loadeprog=5
      }
    },100);
  }

  setclock(that) {

    var _createClass: any = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var TextScramble = function () {
      function TextScramble(el) {
        _classCallCheck(this, TextScramble);

        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
      }

      _createClass(TextScramble, [{
        key: 'setText',
        value: function setText(newText) {
          var _this = this;

          var oldText = this.el.innerText;
          var length = Math.max(oldText.length, newText.length);
          var promise = new Promise(function (resolve) {
            return _this.resolve = resolve;
          });
          this.queue = [];
          for (var i = 0; i < length; i++) {
            var from = oldText[i] || '';
            var to = newText[i] || '';
            var start = Math.floor(Math.random() * 40);
            var end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from: from, to: to, start: start, end: end });
          }
          cancelAnimationFrame(this.frameRequest);
          this.frame = 0;
          this.update();
          return promise;
        }
      }, {
        key: 'update',
        value: function update() {
          var output = '';
          var complete = 0;
          for (var i = 0, n = this.queue.length; i < n; i++) {
            var _queue$i = this.queue[i],
              from = _queue$i.from,
              to = _queue$i.to,
              start = _queue$i.start,
              end = _queue$i.end,
              char = _queue$i.char;

            if (this.frame >= end) {
              complete++;
              output += to;
            } else if (this.frame >= start) {
              if (!char || Math.random() < 0.28) {
                char = this.randomChar();
                this.queue[i].char = char;
              }
              output += '<span class="dud">' + char + '</span>';
            } else {
              output += from;
            }
          }
          this.el.innerHTML = output;
          if (complete === this.queue.length) {
            this.resolve();
          } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
          }
        }
      }, {
        key: 'randomChar',
        value: function randomChar() {
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
      }]);

      return TextScramble;
    }();

    //var phrases = [{name:'Software developer'},{name:'Web designer'},{name:'Mobile apps creator'}]

    var el = document.querySelector('.textScramble');
    var fx = new TextScramble(el);

    var counter = 0;
   
    var next = function next() {
      for (let i = 0; i < that.phrases.length; i++) 
      that.colores[i]=false
  
     that.colores[counter]=true
      fx.setText(that.phrases[counter]).then(function () {
        setTimeout(next, 2000);
      });
      counter = (counter + 1) % that.phrases.length;
    };

    next();
  }
  changePass(){
    const modalRef = this._modalService.open(UserPassComponent, { windowClass: 'dark-modal' });
  }

}
