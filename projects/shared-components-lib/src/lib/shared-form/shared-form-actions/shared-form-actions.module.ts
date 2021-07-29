import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFormsModule } from '../shared-forms/shared-forms.module';
import { SharedModule } from '../shared/shared.module';
import { SharedFormActionsComponent } from './shared-form-actions.component';

@NgModule({
  declarations: [SharedFormActionsComponent],
  imports: [CommonModule, SharedModule.forChild(), SharedFormsModule],
  providers: [],
  exports: [SharedFormActionsComponent],
})
export class SharedFormActionsModule {}
