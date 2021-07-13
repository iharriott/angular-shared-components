import { FormGroup, ValidatorFn } from '@angular/forms';

export enum FieldType {
  INPUT = 'input',
  SELECT = 'select',
  TOGGLE = 'toggle',
  RADIO = 'radio',
  INPUT_DATE = 'date',
  CHECK_BOX = 'checkbox',
  BUTTON_TOGGLE = 'buttonToggle',
}

export enum TemplateType {
  DEFAULT = 'default',
  CUSTOM = 'custom',
}

export enum FormAction {
  VOID,
  ASYNC,
  VALUE_CHANGE,
}

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
}

export interface NgFormsOutputConfig {
  form?: FormGroup | null | undefined;
  value?: any;
  fieldData?: any;
  isFormValid?: boolean;
  actionType?: FormAction;
}

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
  // templateType: TemplateType | string;
  type?: string | 'text';
  hint?: string;
  tooltip?: string;
  info?: string;
  required?: boolean;
  readonly?: boolean;
  alwaysShow?: boolean;
  defaultValue?: any;
  prefixIcon?: string;
  suffixIcon?: string;
  className?: string[];
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
