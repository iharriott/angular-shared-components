import {
  Component,
  OnInit,
  AfterViewInit,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DcfColumn } from './dcf-column.interface';
import { Config, DataDefinition } from './atom-grid-data.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TableExportFormat } from './table-export-format.interface';
import { ExportType } from 'mat-table-exporter';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GridState } from './gridstate.interface';

@Component({
  selector: 'app-atom-grid',
  templateUrl: './atom-grid.component.html',
  styleUrls: ['./atom-grid.component.css'],
})
export class AtomGridComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() gridData!: DataDefinition;
  @Input()
  gridState$!: BehaviorSubject<GridState>;
  @Input() detailsEvent!: string;
  @Input() updateEvent!: string;
  @Input() deleteEvent!: string;
  @Input() showExport = false;
  @Input() showCheckboxColumn = false;
  @Input() showSaveColumnData = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() footerRow: { [index: string]: string } = {};
  @Output() cellClicked = new EventEmitter<unknown>();
  @Output() columnDataAction: EventEmitter<unknown> =
    new EventEmitter<unknown>();
  @Output() checkboxDataAction: EventEmitter<unknown> =
    new EventEmitter<unknown>();

  ngUnsubscribe$: Subject<unknown> = new Subject();
  dataSource!: MatTableDataSource<unknown>;
  columnNames: DcfColumn[] = [];
  displayedColumnsArray: string[][] = [];
  dataColumns: string[] = [];
  numberOfRows = 50; // PageSize
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  hasFooterRow = false;
  @ViewChild(MatTable) table!: MatTable<unknown>;

  selection = new SelectionModel<unknown>(true, []);

  tableExportFormats: TableExportFormat[] = [
    { value: 'csv', viewValue: 'csv' },
    { value: 'txt', viewValue: 'txt' },
    { value: 'xls', viewValue: 'xls' },
    { value: 'xlsx', viewValue: 'xlsx' },
    { value: 'json', viewValue: 'json' },
  ];

  selectedTableExportFormat: ExportType = this.tableExportFormats[0]
    .value as ExportType;

  ngOnInit(): void {
    this.setupSorting();
    this.getGrid();
    this.setEventdisplayColumns();
  }

  /**
   * creates table based on DCF definitions
   * @param dcfId - the Id used in ARCDb.dbo.DCF_Component
   */
  getGrid(): void {
    this.getHeaders(this.gridData.columns);
    const config: Config[] = this.gridData.config;
    const tempNumberOfRows = config.find((x: { configName: string }) => {
      return x.configName === 'PageSize';
    })?.configValue as string; // if not set, defaults to 50

    if (tempNumberOfRows !== null) {
      this.numberOfRows = Number(tempNumberOfRows);
    }

    // once grid is set up, we can start populating with data.
    this.gridState$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((gridState) => {
        this.gridStateChanged(gridState);
      });
  }

  /**
   * populates displayedColumnsArray, columnNames, and dataColumns for displaying grid in html file
   * @param columns - flat array of columns that will be sorted, and put into a heirarchy by this function
   */
  getHeaders(columns: DcfColumn[]): void {
    // populate children of each parent column
    columns.forEach((col) => {
      col.colspan = 1;
      col.rowspan = 1;
    });
    columns = columns.sort((a, b) => a.displayOrder - b.displayOrder);
    columns = columns.map((col) => {
      col.children = columns.filter((x) => x.parentFieldId === col.fieldId);
      return col;
    });
    const columnArray: DcfColumn[][] = [];
    const displayedColumnsArray = [];
    let nextRow: DcfColumn[];
    // top level of headers (no parent)
    nextRow = columns.filter((x) => !x.parentFieldId && x.headerText !== null);
    while (nextRow.length) {
      columnArray.push(nextRow);
      displayedColumnsArray.push(nextRow.map((x) => x.fieldName));
      // next row of headers (has parent in previous row)
      nextRow = <DcfColumn[]>(
        columnArray[columnArray.length - 1]
          .map((x) => x.children)
          .reduce((acc, val) => acc?.concat(val as DcfColumn[]), [])
      ); // should be able to replace reduce with .flat() in es2019
    }
    for (let i = columnArray.length - 2; i >= 0; i--) {
      // iterate from bottom to top, as we require the calculated values in lower rows
      // if no children, make the cell go all the way to the bottom of the headers
      columnArray[i]
        .filter((col) => !col.children?.length)
        .forEach((col) => (col.rowspan = columnArray.length - i));
      // if there are children, make the cell wide enough to cover all children
      columnArray[i]
        .filter((col) => col.children?.length)
        .forEach(
          (col) =>
            (col.colspan = col.children?.reduce(
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              (acc, val) => acc + val.colspan!,
              0
            ))
        );
    }
    this.displayedColumnsArray = displayedColumnsArray;
    this.columnNames = columnArray.reduce((acc, val) => acc.concat(val), []);
    this.columnNames = this.columnNames.filter(
      (col) => col.headerText !== null
    );
    this.dataColumns = this.columnNames
      .filter((col) => !col.children?.length)
      .map((col) => col.fieldName);
  }

  /**
   * sets up sorting
   */
  setupSorting(): void {
    this.dataSource = new MatTableDataSource();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.dataSource.sortingDataAccessor = (item: any, property) => {
      switch (
        this.columnNames.find((x) => x.fieldName === property)?.fieldDataType
      ) {
        case 'link':
          return item[property] ? item[property].display : null; // sort by displayed text
        case 'name':
          return item[property] ? item[property].last : null; // sort by last name
        default:
          return item[property]; // default sort
      }
    };
    this.dataSource.sort = this.sort;
  }

  /**
   * sets columns display order
   */

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setDisplayedColumns() {
    this.columnNames.forEach((col, index) => {
      col.displayOrder = index + 1;
      this.dataColumns[index] = col.fieldName;
      this.displayedColumnsArray[0][index] = col.fieldName;
    });
  }

  /**
   * re-arrange columns during drag drop an re-render grid
   */

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  dropListDropped(event: CdkDragDrop<unknown[]>) {
    if (event) {
      moveItemInArray(
        this.columnNames,
        event.previousIndex,
        event.currentIndex
      );
      this.setDisplayedColumns();
      this.table.renderRows();
    }
  }

  /**
   * Logically adds events columns to the grid
   */
  setEventdisplayColumns(): void {
    if (this.detailsEvent) {
      this.displayedColumnsArray[0] = [
        ...this.displayedColumnsArray[0],
        this.detailsEvent,
      ];
      this.dataColumns = [...this.dataColumns, this.detailsEvent];
    }

    if (this.updateEvent) {
      this.displayedColumnsArray[0] = [
        ...this.displayedColumnsArray[0],
        this.updateEvent,
      ];
      this.dataColumns = [...this.dataColumns, this.updateEvent];
    }

    if (this.deleteEvent) {
      this.displayedColumnsArray[0] = [
        ...this.displayedColumnsArray[0],
        this.deleteEvent,
      ];
      this.dataColumns = [...this.dataColumns, this.deleteEvent];
    }

    if (this.showCheckboxColumn) {
      this.displayedColumnsArray[0] = [
        'select',
        ...this.displayedColumnsArray[0],
      ];
      this.dataColumns = ['select', ...this.dataColumns];
    }
  }

  emitColumnData(): void {
    this.columnDataAction.emit(this.columnNames);
  }

  /**
   * Removes events columns from the grid during export
   */
  onExport(): void {
    this.deleteEvent = '';
    this.updateEvent = '';
    this.detailsEvent = '';
    this.getGrid();
    this.setEventdisplayColumns();
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row: unknown) =>
          this.selection.select(row)
        );
  }

  onChange(event: MatCheckboxChange, row: unknown): void {
    this.checkboxDataAction.emit({ checkState: event.checked, payload: row });
  }

  gridStateChanged(gridState: GridState): void {
    this.hasFooterRow = Object.keys(this.footerRow).length > 0;
    if (gridState.isLoaded) {
      this.updateGridData(gridState.payload);
    }
  }

  /**
   * use data passed in to populate the table
   * @param data data to display in table - array of rows
   */
  updateGridData(data: unknown[] = []): void {
    data = data || [];

    this.dataSource.data = data;
    this.paginator?.firstPage();
  }

  /* addTotalRow(_totalRow: TotalRow, _data: unknown[]): unknown[] {
    throw new Error('Method not implemented.');
  } */

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Emits event to parent component when a cell with a link is clicked
   * @param isLink - true if the cell is link type (if false the function does nothing)
   * @param data - data from link (json object {display: 'some text', data: <whatever's required for link from parent component>})
   */

  onCellClicked(
    isLink: boolean,
    data: { display?: string; data: unknown }
  ): void {
    if (isLink && data) {
      // link cell with valid link (not empty)
      this.cellClicked.emit(data.data);
    }
  }

  onButtonClicked(action: string, row: unknown): void {
    this.cellClicked.emit({ action: action, payload: row });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
