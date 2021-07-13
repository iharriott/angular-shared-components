import { NgModule } from '@angular/core';
import { MaterialsModule } from './modules/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirstKeyPipe } from './pipes/first-key.pipe';

@NgModule({
  imports: [CommonModule, MaterialsModule, FormsModule, ReactiveFormsModule],
  exports: [MaterialsModule, FormsModule, ReactiveFormsModule, FirstKeyPipe],
  declarations: [FirstKeyPipe],
  providers: [],
})
export class SharedOthersModule {}
