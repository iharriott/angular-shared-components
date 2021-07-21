import { Injectable } from '@angular/core';
import { Column } from '../atom-grid-data.interface';

@Injectable({
  providedIn: 'root',
})
export class FooterRowService {
  getFirstColumn(columnData: Column[]): string {
    const firstColumnName = columnData
      .filter((col) => !col.hasSumColumn && col.headerText !== null)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((x) => x.fieldName)[0];

    return firstColumnName;
  }

  createFooterRow<T>(columnData: Column[], tableData: T[]): unknown {
    const footerRow: { [index: string]: string } = {};
    const firstColumn = this.getFirstColumn(columnData);

    footerRow[firstColumn] = 'Total';

    const footerColumns = this.getFooterColumns(columnData);
    footerColumns.forEach((col) => {
      footerRow[col] = this.getSum(tableData, col).toString();
    });

    return footerRow;
  }

  getSum<T>(data: T[], column: string): number {
    const total = data.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc: number, sumValue: any) => acc + sumValue[column],
      0
    );

    return total;
  }

  getFooterColumns(columnData: Column[]): string[] {
    const footerColumns = columnData
      .filter((x) => x.hasSumColumn && x.fieldDataType === 'number')
      .map((col) => col.fieldName);

    return footerColumns;
  }
}
