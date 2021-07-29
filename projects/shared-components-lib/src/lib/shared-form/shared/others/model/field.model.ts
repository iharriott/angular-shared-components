import { ValidatorFn } from '@angular/forms';
import { FieldType, FlexPosition, TemplateType } from '../constants/field.constants';

export interface NgFormsConfig {
  dynamicFormName?: string | 'Ng-Forms';
  fieldGroups: FieldGroup[];
}

export interface FieldGroup {
  fieldConfig: FieldConfig[];
  fieldGroupClassName?: string | 'row';
  fieldTemplateType?: TemplateType | string | 'default';
}

export interface FieldConfig {
  id?: string;
  key: string;
  label: string;
  sequence: number;
  fieldType: FieldType | string;
  type?: string | 'text';
  hint?: string;
  tooltip?: string | null;
  info?: string;
  required?: boolean;
  readonly?: boolean;
  alwaysShow?: boolean;
  defaultValue?: any;
  prefixIcon?: string;
  suffixIcon?: string;
  className?: string | FlexPosition;
  options?: OptionObject[];
  fieldClass?: string;
  fieldValidators?: ValidatorFn | null;
  validationMessages?: {
    [fieldName: string]: [{ errorType: string; errorMessage: string }];
  } | null;
  // FIXME below validators model might not be required
  /*defaultValidations?: Condition[];
  customValidators?: (ValidatorFn | null | undefined)[];*/
  validationRegex?: string;
  controlParentId?: string;
  controlParentTriggerAnswer?: any;
  controlParentType?: FieldType;
  controlParentRegex?: string;
}

export interface OptionObject {
  optionKey: string;
  labelValues: LabelValue[];
}

export interface LabelValue {
  label: string;
  value: string | number | boolean;
}

export interface MessageObject {
  fieldName: string;
  messageValues: MessageValue[];
}

export interface MessageValue {
  errorType: string;
  errorMessage: string | number | boolean;
}
