import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFormsComponent } from './modules/shared-forms/shared-forms.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [SharedFormsComponent],
  imports: [CommonModule, SharedModule.forChild()],
  providers: [],
  exports: [SharedFormsComponent],
})
export class FormModule {}
