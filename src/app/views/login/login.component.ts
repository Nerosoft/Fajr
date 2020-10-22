import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginServes } from './LoginServes';
import { HeroService } from 'src/app/hero/hero.service';
import { ToastService } from '../toasts/toast-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from './Logins';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserMangerComponent } from '../user-manger/user-manger.component';
import { SubBranch } from './SubBranch';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  static USERLOGIN = false;
  productId = 'مجموعة شركات الفجر ';
  isBranch = false;
  dataBranch: SubBranch;

  branchs = [];
  defBranch = '';
  isLogin = true;
  model = Login.setLogin();
  message;
  err;
  subscription;
  constructor(
    public toastService: ToastService,
    private loginServes: LoginServes,
    private route: Router,
    private routes: ActivatedRoute,
    private modalService: NgbModal,
    private heroService: HeroService
  ) {
    // this.model.userName='abdullah';
    // this.model.pass='123123456'
    this.message = this.heroService.message;
    this.err = this.heroService.err.Login;
    this.routes.paramMap.subscribe((params) => {
      if (params.get('productId') != null) {
        this.shearchCompany(params.get('productId'));
      }
    });
  }
  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {}

  login() {
    if (this.model.validateLogin()) {
      this.showSuccess();
    } else {
      if (this.model.stuserName) {
        this.showDanger(this.err.userName);
      }
      if (this.model.stpass) {
        this.showDanger(this.err.pass);
      }
    }
  }

  sinIn() {
    if (this.model.validateInput()) {
      this.loginServes.createUser(this.model, () => {
        this.toastService.show(this.message.success.signUp, {
          classname: 'bg-success text-light',
          delay: 7000,
        });
        environment.systemConfig.linkdata = this.model.companyName; // database root
        environment.systemConfig.aliasname = this.model.aliasName; // name of company
        environment.systemConfig.branch = this.model.userName; // name of user
        LoginComponent.USERLOGIN = true; // login
        this.route.navigate(['/']);
      });
    } else {
      if (this.model.stcompanyName) {
        this.showDanger(this.err.companyName);
      }
      if (this.model.staliasName) {
        this.showDanger(this.err.aliasName);
      }
      if (this.model.stuserName) {
        this.showDanger(this.err.userName);
      }
      if (this.model.stpass) {
        this.showDanger(this.err.pass);
      }
      if (this.model.stforgitKey) {
        this.showDanger(this.err.forgitKey);
      }
    }
  }

  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, {
      classname: 'bg-danger text-light',
      delay: 3000,
    });
  }
  showSuccess() {
    if (this.isBranch) {
      let state = true;
      this.branchs.forEach((element) => {
        if (
          this.model.userName === element.name &&
          this.model.pass === element.pass &&
          this.defBranch === element.branchName &&
          LoginComponent.USERLOGIN === false
        ) {
          state = false;
          environment.systemConfig.linkdata =
            this.productId + '/aplication/' + element.branchName;
          this.toastService.show(this.message.success.signIn, {
            classname: 'bg-success text-light',
            delay: 3000,
          });
          LoginComponent.USERLOGIN = true;
          this.route.navigate(['/']);
        }
      });
      if (state) {
        this.showDanger(this.message.error.err);
      }
    } else {
      this.subscription = this.loginServes
        .getUsersList()
        .valueChanges()
        .subscribe((users) => {
          let state = true;
          users.forEach((element) => {
            if (
              this.model.userName === element.userName &&
              this.model.pass === element.pass &&
              LoginComponent.USERLOGIN === false
            ) {
              this.toastService.toasts = [];
              this.toastService.show(this.message.success.signIn, {
                classname: 'bg-success text-light',
                delay: 3000,
              });
              environment.systemConfig.linkdata = element.companyName; // database root
              environment.systemConfig.aliasname = element.aliasName; // name of company
              environment.systemConfig.branch = element.userName; // name of user
              LoginComponent.USERLOGIN = true; // login
              state = false;
            }
          });
          if (state) {
            this.model.stuserName = true;
            this.model.stpass = true;
            this.showDanger(this.message.error.err);
          } else {
            this.route.navigate(['/']);
          }

          this.subscription.unsubscribe();
        });
    }
  }

  back() {
    this.isLogin = !this.isLogin;
  }

  forgot() {
    const modalRef = this.modalService.open(UserMangerComponent, {
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.title = 'استعادة علمة المرور';
    modalRef.componentInstance.nameAction = 'استرجاع';
    modalRef.componentInstance.callback = (modal, userName, pass) => {
      this.subscription = this.loginServes
        .getUsersList()
        .valueChanges()
        .subscribe((users) => {
          let state = true;
          users.forEach((element) => {
            if (userName === element.userName && pass === element.forgitKey) {
              state = false;
              this.toastService.show(this.message.success.plus, {
                classname: 'bg-success text-light',
                delay: 3000,
              });
              modalRef.componentInstance.finalPass = element.pass;
              modalRef.componentInstance.state = true;
            }
          });
          if (state) {
            this.showDanger(this.message.error.err);
            modalRef.componentInstance.setError();
          }
          this.subscription.unsubscribe();
        });
    };
  }

  setBranch(index) {
    this.defBranch = this.branchs[index].branchName;
  }
  shearchCompany(productId) {
    this.subscription = this.loginServes
      .getUsersList()
      .valueChanges()
      .subscribe((users) => {
        let state = true;
        users.forEach((element) => {
          if (productId === element.companyName) {
            state = false;
            this.productId = element.companyName;
            environment.systemConfig.aliasname = element.aliasName;
            this.loginServes
              .getDatabase('diploma/aplication/' + productId)
              .subscribe((data: SubBranch) => {
                this.dataBranch = data;
                this.branchs = Object.values(this.dataBranch.branch);
                this.defBranch = this.branchs[0].branchName;
                this.isBranch = true;
              });
          }
        });
        if (state) {
          this.showDanger(this.message.error.login);
          this.route.navigate(['Login']);
        }
        this.subscription.unsubscribe();
      });
  }
}
