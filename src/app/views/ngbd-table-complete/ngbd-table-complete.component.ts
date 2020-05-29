import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {Country} from './country';
import {CountryService} from './country.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableEditComponent } from './edit/table-edit/table-edit.component';
@Component({
  selector: 'app-ngbd-table-complete',
  templateUrl: './ngbd-table-complete.component.html',
  styleUrls: ['./ngbd-table-complete.component.css'],
  providers: [CountryService, DecimalPipe]
})
export class NgbdTableCompleteComponent implements OnInit {

  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @Input('hedTable') hedTable: [];
  @Input('info') info: []=[];
  @Input('Id') Id:string;
  show=false;
  service: CountryService=null;
  static callback;

  constructor(public pipe: DecimalPipe,public _modalService: NgbModal) {
    this.service=new CountryService(pipe)
    this.countries$ = this.service.countries$;
    this.total$ = this.service.total$;

    //this.setupClientsComponent();
  }


  ngOnInit(): void {
    if(this.Id=='InputComponent'|| this.Id=='OutputComponent')
      this.show=true;
    this.service.setup(this.info);//عشان اول مره يحمل
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }



  edit(id){
    let componant={ClientsComponent:"شاشة العملاء",
    CategorysComponent:"شاشة الاصناف",
    SuppliersComponent:"شاشة الموردين",
    StoresComponent:"شاشة المخازن",
    InputComponent:"شاشة المشتريات",
    OutputComponent:"شاشة المبيعات"}
    console.log("id [1] is "+id)
    TableEditComponent.setupTableEditComponent(this.Id,componant[this.Id],id,()=>{
      NgbdTableCompleteComponent.callback()
    });
    this._modalService.open(TableEditComponent, { size: 'xl'});
  }

  openXlShowTable(ID) {
    TableEditComponent.setupTableShowComponent(ID,this.Id);
    this._modalService.open(TableEditComponent, { size: 'xl'});
    console.log(ID);
  }

}
