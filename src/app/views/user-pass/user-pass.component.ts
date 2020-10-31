import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toasts/toast-service';
import { map } from 'rxjs/operators';
import { LoginServes } from '../login/LoginServes';
import { LoginComponent } from '../login/login.component';
import { HeroService } from 'src/app/hero/hero.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-user-pass',
  templateUrl: './user-pass.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../user-manger/user-manger.component.scss'],
})
export class UserPassComponent implements OnInit {
  pass;
  newpass;
  stpass = false;
  stnewpass = false;
  message;
  constructor(
    public modal: NgbActiveModal,
    public toastService: ToastService,
    private loginServes: LoginServes,
    private heroService: HeroService
  ) {
    this.message = this.heroService.lang.message;
  }
  setError() {
    this.stnewpass = true;
    this.stpass = true;
  }
  changePass() {

    const subscription = this.loginServes
      .getUsersList()
      .snapshotChanges().pipe(
        map((changes) =>
        changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((users) => {
        let state = true;
        users.forEach((element) => {
          if (
            environment.systemConfig.branch === element.userName &&
            this.pass === element.pass
          ) {

            state = false;
            element.pass = this.newpass;
            this.toastService.show(this.message.success.changPass, {
              classname: 'bg-success text-light',
              delay: 3000,
            });
            this.loginServes.updateUser(element.key, element);
            this.modal.dismiss();
          }
        });
        if (state) {
          this.showDanger(this.message.error.err);
          this.setError();
        }
        subscription.unsubscribe();
      });
  }

  ngOnInit() {}
  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, {
      classname: 'bg-danger text-light',
      delay: 3000,
    });
  }
}
