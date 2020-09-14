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
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productId= HeroService.companyName
  constructor(private clientsServes: ClientsServes,
    private categorysServes: CategorysServes,
    private suppliersServes: SuppliersServes,
    private storesServes: StoresServes,
    private inputServes: InputServes,
    private outServes: OutServes,
    private branch :BranchServes,
    private route: Router,) {

      if (!LoginComponent.USERLOGIN)
      this.route.navigate(['/Login']);
    else
      this.setupUserInfo()
    
     
  }

  ngOnInit() {

  }

  setupUserInfo() {
    console.log('START HOME INTILIZE')
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

  sendDataEffect() {

    let dom: HTMLElement = document.getElementById("progloadeid");
    let loadeprog = 5;
    dom.style.width = loadeprog + "%";
    dom.parentElement.style.display = 'flex';
    let timer = setInterval(function () {
      loadeprog += 7;
      dom.style.width = loadeprog + "%";
      if (loadeprog >= 120) {
        clearInterval(timer);
        dom.parentElement.style.display = 'none';
        dom.style.width = 0 + "%";
        loadeprog = 5
      }
    }, 100);
  }

}
