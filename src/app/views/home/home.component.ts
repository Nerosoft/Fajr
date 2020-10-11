import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ClientsServes } from '../clients/ClientsServes';
import { CategorysServes } from '../categorys/CategorysServes';
import { SuppliersServes } from '../suppliers/SuppliersServes';
import { StoresServes } from '../stores/storesServes';
import { InputServes } from '../input/InputServes';
import { OutServes } from '../output/OutServes';
import { map } from 'rxjs/operators';
import { HeroService } from 'src/app/hero/hero.service';
import { BranchServes } from '../branch/BranchServes';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productId = environment.systemConfig.aliasname;
  constructor(
    private clientsServes: ClientsServes,
    private categorysServes: CategorysServes,
    private suppliersServes: SuppliersServes,
    private storesServes: StoresServes,
    private inputServes: InputServes,
    private outServes: OutServes,
    private branch: BranchServes,
    private heroService: HeroService
  ) {
    this.setupUserInfo();
  }

  ngOnInit() {}

  setupUserInfo() {
    console.log('START HOME INTILIZE');
    this.clientsServes.setupAngularFireList();
    this.categorysServes.setupAngularFireList();
    this.suppliersServes.setupAngularFireList();
    this.storesServes.setupAngularFireList();
    this.inputServes.setupAngularFireList();
    this.outServes.setupAngularFireList();
    this.branch.setupAngularFireList();
    const suppliersSubscrib = this.suppliersServes
      .getSuppliersList()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((suppliers) => {
        this.heroService.suppliers = suppliers;
        suppliersSubscrib.unsubscribe();
      });

    const clientsSubscrib = this.clientsServes
      .getClientsList()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((clients) => {
        this.heroService.clients = clients;
        clientsSubscrib.unsubscribe();
      });
    //
    const categorysSubscrib = this.categorysServes
      .getCategorysList()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((categorys) => {
        this.heroService.categorys = categorys;
        categorysSubscrib.unsubscribe();
      });

    const storesSubscrib = this.storesServes
      .getStoresList()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((stores) => {
        this.heroService.stores = stores;
        storesSubscrib.unsubscribe();
      });
  }

  sendDataEffect() {
    let dom: HTMLElement = document.getElementById('progloadeid');
    let loadeprog = 5;
    dom.style.width = loadeprog + '%';
    dom.parentElement.style.display = 'flex';
    let timer = setInterval(function () {
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
}
