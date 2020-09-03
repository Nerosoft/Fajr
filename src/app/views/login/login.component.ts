import { Component, OnInit } from '@angular/core';
import { LoginServes } from './LoginServes';
import { HeroService } from 'src/app/hero/hero.service';
import { ToastService } from '../toasts/toast-service';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from './Logins';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserMangerComponent } from '../user-manger/user-manger.component';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { SubBranch } from './SubBranch';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  static USERLOGIN = false;
  static USERNAME = 'salahhh';
  productId="مجموعة شركات الفجر "
  isBranch=false
  dataBranch:SubBranch

  branchs=[]
  defBranch=""
  isLogin: boolean = true
  model = Login.setLogin();
  message=HeroService.message
  err = HeroService.err.Login
  constructor(public toastService: ToastService,
    private loginServes: LoginServes,
    private route: Router,
    private routes: ActivatedRoute,
    private _modalService: NgbModal,) {
    this.routes.paramMap.subscribe(params => {
      if (params.get('productId') != null) {
        this.shearchCompany(params.get('productId'))

      }
    })
  }

  ngOnInit() {
  }


  login(dangerTpl) {

    if (this.model.validateInput()) {
      this.showSuccess();
    } else {
      if (this.model.stuserName)
        this.showDanger(dangerTpl[0])
      if (this.model.stpass)
        this.showDanger(dangerTpl[1])
    }

  }

  sinIn(dangerTpl) {
    if (this.model.validateInput()) {
      this.loginServes.createUser(this.model)
      this.toastService.show(this.message.success.signUp, { classname: 'bg-success text-light', delay: 7000 });
      LoginComponent.USERNAME = this.model.companyName  //database root
      HeroService.companyName=this.model.aliasName     // name of company
      HeroService.USERNAME=this.model.userName        // name of user 
      LoginComponent.USERLOGIN = true;            // login 
      this.route.navigate(['/']);
    } else {
      if (this.model.stuserName)
        this.showDanger(dangerTpl[0])
      if (this.model.stpass)
        this.showDanger(dangerTpl[1])
    }
  }

  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 3000 });
  }
  showSuccess() {
    if(this.isBranch){
      let state = true;
      this.branchs.forEach(element => {
        if(this.model.userName == element.name &&
          this.model.pass == element.pass &&
          this.defBranch==element.branchName && LoginComponent.USERLOGIN == false){
            state = false;
            LoginComponent.USERNAME = this.productId+'/aplication/'+element.branchName
            this.toastService.show(this.message.success.signIn, { classname: 'bg-success text-light', delay: 3000 });
            LoginComponent.USERLOGIN = true;
            this.route.navigate(['/']);
          }
      });
      if (state) 
      this.showDanger(this.message.error.err)
    }
    else{
    let subscription = this.loginServes.getUsersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(users => {
      let state = true;
      users.forEach(element => {
        if (this.model.userName == element.userName &&
          this.model.pass == element.pass && LoginComponent.USERLOGIN == false) {
          let today = new Date();
          let logs = (today.getMonth() + 1) + '-' + today.getDate() + ' H ' + today.getHours() + ',' + today.getMinutes();
          element.login.push(logs)
          this.loginServes.updateUser(element.key, element)
          this.toastService.toasts = [];
          this.toastService.show(this.message.success.signIn, { classname: 'bg-success text-light', delay: 3000 });
          LoginComponent.USERNAME = element.companyName  //database root
          HeroService.companyName=element.aliasName     // name of company
          HeroService.USERNAME=element.userName        // name of user 
          LoginComponent.USERLOGIN = true;            // login 
          state = false;
        }
        if (state) {
          this.model.stuserName = true;
          this.model.stpass = true;
          this.showDanger(this.message.error.err)
        } else
          this.route.navigate(['/']);

        subscription.unsubscribe();
      });
    });
  }
  }

  back() {
    this.isLogin = !this.isLogin
  }

  forgot() {
    const modalRef = this._modalService.open(UserMangerComponent, { windowClass: 'dark-modal' });
    modalRef.componentInstance.title = "استعادة علمة المرور"
    modalRef.componentInstance.nameAction = "استرجاع"
    modalRef.componentInstance.callback = (modal, userName, pass) => {
      let subscription = this.loginServes.getUsersList().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(users => {
        let state = true;
        users.forEach(element => {
          if (userName == element.userName && pass == element.forgitKey) {
            state = false
            this.toastService.show(this.message.success.plus, { classname: 'bg-success text-light', delay: 3000 });
            modalRef.componentInstance.finalPass = element.pass
            modalRef.componentInstance.state = true
          }

        });
        if (state) {
          this.showDanger(this.message.error.err)
          modalRef.componentInstance.setError()
        }
        subscription.unsubscribe();
      });
    }

  }

  setBranch(index){
    this.defBranch=this.branchs[index].branchName
  }
  shearchCompany(productId){
    let subscription = this.loginServes.getUsersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(users => {
      let state = true;
      users.forEach(element => {
        if (productId == element.companyName ) {
            state = false
            this.productId=element.companyName
            HeroService.companyName=element.aliasName
            this.loginServes.getDatabase('diploma/aplication/'+productId).
              subscribe((data:SubBranch)=>{
              this.dataBranch=data
              this.branchs=Object.values(this.dataBranch.branch)
              this.defBranch=this.branchs[0].branchName
              this.isBranch=true
              
            })
           
        }

      });
      if (state) {
        this.showDanger(this.message.error.login)
        this.route.navigate(['Login']);
      
      }
      subscription.unsubscribe();
    })
  }

}



