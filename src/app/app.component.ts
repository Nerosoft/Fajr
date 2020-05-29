import { Component, Injectable, Input } from '@angular/core';
import { HeroService } from './hero/hero.service';
import { ClientsServes } from './views/clients/ClientsServes';
import { map } from 'rxjs/operators';
import { CategorysServes } from './views/categorys/CategorysServes';
import { SuppliersServes } from './views/suppliers/SuppliersServes';
import { StoresServes } from './views/stores/storesServes';

import { LoginComponent } from './views/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'TypeScript Type';
  static justOne=true;




  constructor(private clientsServes: ClientsServes ,
    private categorysServes:CategorysServes,
    private suppliersServes:SuppliersServes,
    private storesServes:StoresServes,
    private route: Router ) {



     
      this.suppliersServes.getSuppliersList().snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ key: c.payload.key, ...c.payload.val() })
            )
          )
        ).subscribe(suppliers => {
         HeroService.suppliers = suppliers;
         console.log( "xxxxxxxxxx", HeroService.suppliers);
        });




    this.clientsServes.getClientsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(clients => {
     HeroService.clients = clients;
    
     console.log( "xxxxxxxxxx", HeroService.clients);
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
     console.log( "xxxxxxxxxx",HeroService.categorys);
    });


    this.storesServes.getStoresList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(stores => {
     HeroService.stores = stores;
     console.log( HeroService.stores);
    });


    
    if(!LoginComponent.USERLOGIN)
      this.route.navigate(['/Login']);
    

  }
  
   
  
 
    ngOnInit() {
      
    
      
    
     }

  


}








