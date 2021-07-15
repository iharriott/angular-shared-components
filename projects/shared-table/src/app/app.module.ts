import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestGridComponent } from './test-grid/test-grid.component';
import { AtomGridComponent } from './atom-grid/atom-grid.component';
import { MaterialsModule } from '../../../shared-modules/material.module';
import { AppRoutingModule } from './app-routing.module';
import { MatTableExporterDirective } from './atom-grid/mat-table-exporter.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TestGridComponent,
    AtomGridComponent,
    MatTableExporterDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialsModule,
    AppRoutingModule,
    FormsModule,
  ],
  exports: [MaterialsModule, MatTableExporterDirective],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
