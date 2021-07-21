import {
  Directive,
  Host,
  Optional,
  Renderer2,
  Self,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  CdkTableExporter,
  DataExtractorService,
  ServiceLocatorService,
} from 'cdk-table-exporter';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appMatTableExporter]',
  exportAs: 'matTableExporter',
})
export class MatTableExporterDirective
  extends CdkTableExporter
  implements AfterViewInit
{
  getPageSize(): number {
    return this.getPaginator().pageSize;
  }
  getTotalItemsCount(): number {
    return this.getPaginator().length;
  }
  constructor(
    renderer: Renderer2,
    serviceLocator: ServiceLocatorService,
    dataExtractor: DataExtractorService,
    @Host() @Self() @Optional() table: MatTable<unknown>
  ) {
    super(renderer, serviceLocator, dataExtractor, table);
  }
  ngAfterViewInit(): void {
    this.exportStarted.subscribe(() => {
      this.enablePaginator(false);
    });
    this.exportCompleted.subscribe(() => {
      this.enablePaginator(true);
    });
  }

  /**
   * MatTable implementation of getPageCount
   */
  public getPageCount(): number {
    return this.getPaginator().getNumberOfPages();
  }

  /**
   * MatTable implementation of getCurrentPageIndex
   */
  public getCurrentPageIndex(): number {
    return this.getPaginator().pageIndex;
  }

  /**
   * MatTable implementation of goToPage
   */
  public goToPage(index: number): void {
    this.getPaginator().pageIndex = index;
    this.getPaginator()._changePageSize(this.getPaginator().pageSize);
  }

  /**
   * MatTable implementation of getPageChangeObservable
   */
  public getPageChangeObservable(): Observable<unknown> {
    return this.getPaginator().page;
  }

  private getPaginator(): MatPaginator {
    return (this._cdkTable.dataSource as MatTableDataSource<unknown>)
      .paginator as MatPaginator;
  }

  private enablePaginator(value: boolean) {
    if (this.getPaginator()) {
      this.getPaginator().disabled = !value;
      this.getPaginator()._changePageSize(this.getPaginator().pageSize);
    }
  }
}
