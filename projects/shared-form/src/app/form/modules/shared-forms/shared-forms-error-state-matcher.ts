import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class SharedFormsErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    _form?: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control && control.invalid);
  }
}
