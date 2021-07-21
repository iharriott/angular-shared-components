import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFilterComponent } from './modules/shared-filter/shared-filter.component';
import { FormModule } from '../../../../shared-form/src/app/form/form.module';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [SharedFilterComponent],
  imports: [CommonModule, SharedModule.forChild(), FormModule],
  providers: [],
  exports: [SharedFilterComponent],
})
export class FilterModule {}
