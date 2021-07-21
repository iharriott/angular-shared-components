import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from '../../../shared/shared.module';
import { FilterModule } from './filter/filter.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    FilterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
