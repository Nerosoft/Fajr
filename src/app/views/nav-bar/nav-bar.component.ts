import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Router,
  NavigationEnd,
} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserPassComponent } from '../user-pass/user-pass.component';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  phrases = [
    'منظومة الشركه',
    'Abdullah',
    'Software',
    'Developer',
    'Web',
    'Android',
    'Database',
  ];
  colores = [true, false, false, false, false, false, false];
  public isMenuCollapsed = true;
  branch = true;
  shouldShow = true;
  constructor(
    private route: Router,
    private _modalService: NgbModal
  ) {

  }

  ngOnInit() {
    this.route.events.subscribe((val: NavigationEnd) => {
      if (val.url != undefined) {
        if (val.url == '/' || val.url.includes('/Login')) {
          if (val.url.includes('/Login/')) { this.branch = false; }
          this.shouldShow = false;
        } else {
          this.shouldShow = true;
        }
      }
    });
    this.setclock(this);
  }

  sendDataEffect() {
    const dom: HTMLElement = document.getElementById('progloadeid');
    let loadeprog = 5;
    dom.style.width = 0 + '%';
    dom.parentElement.style.display = 'flex';
    const timer = setInterval(function() {
      loadeprog += 7;
      dom.style.width = loadeprog + '%';
      if (loadeprog >= 120) {
        clearInterval(timer);
        dom.parentElement.style.display = 'none';
        dom.style.width = 0 + '%';
        loadeprog = 5;
      }
    }, 100);
  }

  setclock(that) {
    let _createClass: any = (function() {
      function defineProperties(target, props) {
        for (let i = 0; i < props.length; i++) {
          const descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor) { descriptor.writable = true; }
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) { defineProperties(Constructor.prototype, protoProps); }
        if (staticProps) { defineProperties(Constructor, staticProps); }
        return Constructor;
      };
    })();

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    const TextScramble = (function() {
      function TextScramble(el) {
        _classCallCheck(this, TextScramble);

        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
      }

      _createClass(TextScramble, [
        {
          key: 'setText',
          value: function setText(newText) {
            let _this = this;

            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise(function(resolve) {
              return (_this.resolve = resolve);
            });
            this.queue = [];
            for (let i = 0; i < length; i++) {
              const from = oldText[i] || '';
              const to = newText[i] || '';
              const start = Math.floor(Math.random() * 40);
              const end = start + Math.floor(Math.random() * 40);
              this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
          },
        },
        {
          key: 'update',
          value: function update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
              let _queue$i = this.queue[i],
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
          },
        },
        {
          key: 'randomChar',
          value: function randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
          },
        },
      ]);

      return TextScramble;
    })();



    const el = document.querySelector('.textScramble');
    const fx = new TextScramble(el);

    let counter = 0;

    const next = function next() {
      for (let i = 0; i < that.phrases.length; i++) { that.colores[i] = false; }

      that.colores[counter] = true;
      fx.setText(that.phrases[counter]).then(function() {
        setTimeout(next, 2000);
      });
      counter = (counter + 1) % that.phrases.length;
    };

    next();
  }
  changePass() {
    const modalRef = this._modalService.open(UserPassComponent, {
      windowClass: 'dark-modal',
    });
  }
}
