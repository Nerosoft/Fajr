import { Component, Injectable, Input } from '@angular/core';
import { HeroService } from './hero/hero.service';
import { ClientsServes } from './views/clients/ClientsServes';
import { map } from 'rxjs/operators';
import { CategorysServes } from './views/categorys/CategorysServes';
import { SuppliersServes } from './views/suppliers/SuppliersServes';
import { StoresServes } from './views/stores/storesServes';

import { LoginComponent } from './views/login/login.component';
import { Router, ActivatedRoute } from '@angular/router';
import { InputServes } from './views/input/InputServes';
import { OutServes } from './views/output/OutServes';
import { BranchServes } from './views/branch/BranchServes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'TypeScript Type';
  static justOne = true;




  constructor(private clientsServes: ClientsServes,
    private categorysServes: CategorysServes,
    private suppliersServes: SuppliersServes,
    private storesServes: StoresServes,
    private inputServes: InputServes,
    private outServes: OutServes,
    private branch: BranchServes,
    private route: Router,) {
    if (!window.location.pathname.includes("/Login"))
      this.getValid()
  }




  ngOnInit() {

  }


  getValid() {
    if (!LoginComponent.USERLOGIN)
      this.route.navigate(['/Login']);
    else
      this.setupUserInfo()
  }
  setupUserInfo() {
    console.log('START APPCOMPONENT INTILIZE')
    this.clientsServes.setupAngularFireList()
    this.categorysServes.setupAngularFireList()
    this.suppliersServes.setupAngularFireList()
    this.storesServes.setupAngularFireList()
    this.inputServes.setupAngularFireList()
    this.outServes.setupAngularFireList()
    this.branch.setupAngularFireList()

    this.suppliersServes.getSuppliersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(suppliers => {
      HeroService.suppliers = suppliers;
    });




    this.clientsServes.getClientsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(clients => {
      HeroService.clients = clients;


    });
    // 
    this.categorysServes.getCategorysList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(categorys => {
      HeroService.categorys = categorys;
      console.log("qqqqqqqqqqqqq", HeroService.clients);
    });


    this.storesServes.getStoresList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(stores => {
      HeroService.stores = stores;
      console.log(HeroService.stores);
    });
    
  }

}








