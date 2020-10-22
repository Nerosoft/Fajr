import { DecimalPipe } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from './Table.service';
import { EditRow } from '../interfaces';
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
  // tslint:disable-next-line: no-input-rename
  @Input('This') This: EditRow;
  @Input()show = false;
  service: TableService = null;

  constructor(public pipe: DecimalPipe) {
    this.service = new TableService(pipe);
    this.tableInfo$ = this.service.info$;
    this.total$ = this.service.total$;
  }

  ngOnInit(): void {

    this.service.setup(this.info); // عشان اول مره يحمل
  }

  editItem(task: EditRow, model) {
    task.editItem(model);
  }


  openXlShowTable(task: EditRow, model) {
    task.showItem(model);
  }
}
