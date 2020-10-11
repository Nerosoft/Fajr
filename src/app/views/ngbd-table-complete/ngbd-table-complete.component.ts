import { DecimalPipe } from '@angular/common';
import {
  Component,
  QueryList,
  ViewChildren,
  OnInit,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from './Table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableEditComponent } from './edit/table-edit/table-edit.component';
@Component({
  selector: 'app-ngbd-table-complete',
  templateUrl: './ngbd-table-complete.component.html',
  styleUrls: ['./ngbd-table-complete.component.css'],
  providers: [TableService, DecimalPipe],
})
export class NgbdTableCompleteComponent implements OnInit {
  tableInfo$: Observable<any[]>;
  total$: Observable<number>;


  // tslint:disable-next-line: no-input-rename
  @Input('hedTable') hedTable: [];
  // tslint:disable-next-line: no-input-rename
  @Input('info') info: [] = [];
  // tslint:disable-next-line: no-input-rename
  @Input('Id') Id: string;
  show = false;
  service: TableService = null;

  constructor(public pipe: DecimalPipe, public modalService: NgbModal) {
    this.service = new TableService(pipe);
    this.tableInfo$ = this.service.info$;
    this.total$ = this.service.total$;

    // this.setupClientsComponent();
  }

  ngOnInit(): void {
    if (this.Id === 'InputComponent' || this.Id === 'OutputComponent') {
      this.show = true;
    }
    this.service.setup(this.info); // عشان اول مره يحمل
  }


  edit(model: any) {
    const edit = this.modalService.open(TableEditComponent, { size: 'xl' });
    switch (this.Id) {
      case 'CategorysComponent':
        edit.componentInstance.setupCategory(this.Id, model);
        break;
      case 'ClientsComponent':
        edit.componentInstance.setupClint(this.Id, model);
        break;
      case 'SuppliersComponent':
        edit.componentInstance.setupSupplier(this.Id, model);
        break;
      case 'StoresComponent':
        edit.componentInstance.setupStores(this.Id, model);
        break;
      case 'BranchComponent':
        edit.componentInstance.setupBranch(this.Id, model);
        break;
      case 'InputComponent':
        const infoTableInput = [...Object.values(model[0]), ...model.slice(1)];
        edit.componentInstance.setupInput(this.Id, infoTableInput);
        break;
        case 'OutputComponent':
        const infoTableOut = [...Object.values(model[0]), ...model.slice(1)];
        edit.componentInstance.setupOut(this.Id, infoTableOut);
        break;
    }
  }

  openXlShowTable(model) {
    const edit = this.modalService.open(TableEditComponent, { size: 'xl' });
    const infoTable = [...Object.values(model[0]), ...model.slice(1)];
    if (this.Id === 'InputComponent') {
      edit.componentInstance.setupInput('show/InputComponent', infoTable, true);
    } else {
      edit.componentInstance.setupOut('show/OutputComponent', infoTable, true);
    }
  }
}
