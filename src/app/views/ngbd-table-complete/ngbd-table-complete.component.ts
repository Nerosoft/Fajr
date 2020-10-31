import { HeroService } from 'src/app/hero/hero.service';
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
  styleUrls: ['./ngbd-table-complete.component.scss'],
  providers: [TableService, DecimalPipe],
})
export class NgbdTableCompleteComponent implements OnInit {
  public get heroService(): HeroService {
    return this._heroService;
  }
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

  constructor(public pipe: DecimalPipe, private _heroService: HeroService) {
    this.service = new TableService(pipe);
    this.tableInfo$ = this.service.info$;
    this.total$ = this.service.total$;
  }

  ngOnInit(): void {

    this.service.setup(this.info); // عشان اول مره يحمل
  }

  editItem(model) {
    this.This.editItem(model);
  }


  openXlShowTable(model) {
    this.This.showItem(model);
  }
}
