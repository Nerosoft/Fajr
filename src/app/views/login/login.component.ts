import { Component, OnInit } from '@angular/core';
import { LoginServes } from './LoginServes';
import { HeroService } from 'src/app/hero/hero.service';
import { ToastService } from '../toasts/toast-service';
import { map } from 'rxjs/operators';
import {  Router } from '@angular/router';
import { Login } from './Logins';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  static USERLOGIN=false;
  model = Login.setLogin();
  err=HeroService.err.Login;
  constructor(public toastService: ToastService,
    private loginServes:LoginServes,
    private route: Router) {

   }

  ngOnInit() {
  }
  login(dangerTpl){
   
    if(this.model.validateInput()){
        this.showSuccess();
  }else{
    if(this.model.stuserName)
    this.showDanger(dangerTpl[0])
    if(this.model.stpass)
    this.showDanger(dangerTpl[1])
  }

}

sinIn(dangerTpl){
  if(this.model.validateInput()){
    this.loginServes.createUser(this.model)
    this.toastService.show('sucssesful', { classname: 'bg-success text-light', delay: 10000 });
}else{
if(this.model.stuserName)
this.showDanger(dangerTpl[0])
if(this.model.stpass)
this.showDanger(dangerTpl[1])
}
}

  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
  }
  showSuccess() {
    let subscription = this.loginServes.getUsersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(users => {
      let state=true;
      users.forEach(element => {
          if (this.model.userName==element.userName&&
                this.model.pass==element.pass&&LoginComponent.USERLOGIN==false){
                  let today = new Date();
                   let logs=(today.getMonth()+1)+'-'+today.getDate()+' H '+today.getHours() +','+today.getMinutes();
                   element.login.push(logs)
                  this.loginServes.updateUser(element.key, element)
                  this.toastService.toasts=[];
            this.toastService.show('sucssesful Login', { classname: 'bg-success text-light', delay: 10000 });
            LoginComponent.USERLOGIN=true;
            state=false;
          }
          if(state){
            this.model.stuserName=true;
            this.model.stpass=true;
            this.showDanger("من فضلك حاول من جديد")
          }else{
            this.route.navigate(['/']);
            subscription.unsubscribe();
          }
      });
    });
  }
  

}



