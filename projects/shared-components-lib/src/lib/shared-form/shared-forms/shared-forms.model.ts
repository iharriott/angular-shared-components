import { FormGroup } from '@angular/forms';
import { NgFormsConfig } from '../shared/others/model/field.model';
import { FormAction } from '../shared/others/constants/field.constants';

export interface NgFormsInputConfig {
  data: {
    fieldData: any | null;
    fieldConfig: NgFormsConfig | null;
  };
  options?: {
    isShow?: boolean;
    isReady?: boolean;
    isError?: boolean;
    readonly?: boolean;
  };
  formAction?: FormAction;
}

export interface NgFormsOutputConfig {
  form?: FormGroup | null | undefined;
  value?: any;
  fieldData?: any;
  isFormValid?: boolean;
  actionType?: FormAction;
}

