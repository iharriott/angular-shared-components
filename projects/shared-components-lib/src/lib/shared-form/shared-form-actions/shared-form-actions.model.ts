import { Subject } from 'rxjs';
import {
  NgFormsInputConfig,
  NgFormsOutputConfig,
} from '../shared-forms/shared-forms.model';
import { FieldConfig, NgFormsConfig } from '../shared/others/model/field.model';
import {
  FieldType,
  FlexPosition,
} from '../shared/others/constants/field.constants';

export interface SharedFormActionsInputConfig {
  data: {
    fieldData: any | null;
    fieldConfig: NgFormsConfig | null;
    buttonConfig?: FieldConfig[] | null;
  };
  options?: {
    isShow?: boolean;
    isReady?: boolean;
    isError?: boolean;
    readonly?: boolean;
  };
}

export interface SharedFormActionsOutputConfig {
  data?: any;
}

export interface SharedFormsConfig {
  compConfig: NgFormsInputConfig;
  inputChange: Subject<NgFormsInputConfig>;
  compOutput: (event: NgFormsOutputConfig) => void;
}

export const BUTTON_CONFIG: FieldConfig[] = [
  {
    fieldType: FieldType.BUTTON,
    key: 'CLEAR',
    label: 'Clear',
    sequence: 0,
    type: FieldType.BUTTON,
    tooltip: null,
    readonly: false,
    required: true,
    className: FlexPosition.FLEX_END,
  },
  {
    fieldType: FieldType.BUTTON,
    key: 'RESET',
    label: 'Reset',
    sequence: 0,
    type: FieldType.BUTTON,
    tooltip: 'This will revert the filter changes to default settings',
    readonly: false,
    required: true,
    className: FlexPosition.FLEX_END,
  },
  {
    fieldType: FieldType.BUTTON,
    key: 'APPLY',
    label: 'Apply',
    sequence: 0,
    type: FieldType.BUTTON,
    tooltip: null,
    readonly: false,
    required: true,
    className: FlexPosition.FLEX_END,
  },
  {
    fieldType: FieldType.BUTTON,
    key: 'SAVE',
    label: 'Save',
    sequence: 0,
    type: FieldType.BUTTON,
    tooltip: 'This will save and replace the default settings with the new one',
    readonly: false,
    required: true,
    className: FlexPosition.FLEX_START,
  },
];
