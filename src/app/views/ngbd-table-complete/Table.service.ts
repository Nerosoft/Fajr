import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
}

function matches(itemRow, term: string, pipe: PipeTransform) {
  if (Number.isInteger(itemRow[3])) {
    return (
      itemRow[2].toLowerCase().includes(term.toLowerCase()) ||
      pipe.transform(itemRow[1]).includes(term) ||
      pipe.transform(itemRow[3]).includes(term)
    );
  } else {
    return (
      itemRow[2].toLowerCase().includes(term.toLowerCase()) ||
      pipe.transform(itemRow[1]).includes(term) ||
      (itemRow[3] + '').toLowerCase().includes(term.toLowerCase())
    );
  }
}

@Injectable({ providedIn: 'root' })
export class TableService {
  // tslint:disable-next-line: variable-name
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _info$ = new BehaviorSubject<any>([]);
  private _total$ = new BehaviorSubject<number>(0);

  constructor(public pipe: DecimalPipe) {}
  get info$() {
    return this._info$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set page(page: number) {
    this._set({ page });
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
  };
  public data: [];

  setup(info) {
    this.data = info;
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search(this.data)),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._info$.next(result.tableInfo);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(value: []): Observable<any> {
    const { pageSize, page, searchTerm } = this._state;

    // 2. filter
    let tableInfo = value.filter((info) =>
      matches(info, searchTerm, this.pipe)
    );
    const total = tableInfo.length;

    // 3. paginate
    tableInfo = tableInfo.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ tableInfo, total });
  }
}
