import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomGridComponent } from './shared-grid/atom-grid/atom-grid.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableExporterDirective } from './shared-grid/atom-grid/mat-table-exporter.directive';
import { FormsModule } from '@angular/forms';

const materialModules = [
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatSortModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatButtonModule,
  DragDropModule,
  MatTableExporterModule,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [AtomGridComponent, MatTableExporterDirective],
  imports: [FormsModule, CommonModule, materialModules],
  exports: [
    AtomGridComponent,
    MatTableExporterDirective,
    materialModules,
    FormsModule,
  ],
})
export class SharedComponentsLibModule {}
