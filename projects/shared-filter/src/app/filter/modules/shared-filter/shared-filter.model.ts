import {
  NgFormsConfig,
  NgFormsInputConfig,
  NgFormsOutputConfig,
} from '../../../../../../shared-form/src/app/form/modules/shared-forms/shared-forms.model';
import { Subject } from 'rxjs';

export enum ButtonActionType {
  APPLY = 'APPLY',
  RESET = 'RESET',
  CLEAR = 'CLEAR',
  SAVE = 'SAVE',
}

export enum FieldType {
  BUTTON = 'button',
}

export enum ComponentAction {
  VOID,
  ASYNC,
  VALUE_CHANGE,
}

export enum FlexPosition {
  FLEX_START = 'flex-start',
  FLEX_END = 'flex-end',
}

export interface SharedFilterInputConfig {
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

export interface SharedFilterOutputConfig {
  data?: any;
}

export interface ActionButtonContext {
  context: {
    id?: string | null;
    type: string | null | FieldType | undefined;
    label: string;
    tooltip?: string | null;
    tooltipPosition?: string;
    isShow?: boolean;
    isDisable?: boolean;
    icon?: string;
    position?: FlexPosition | string;
    click?: (type: string) => void;
  };
}

export interface FieldConfig {
  id?: string;
  key: string;
  label: string;
  sequence?: number | null;
  type?: string | null;
  tooltip?: string | null;
  readonly?: boolean;
  required?: boolean;
  defaultValue?: any;
  prefixIcon?: string;
  suffixIcon?: string;
  className?: string;
}

export interface SharedFormsConfig {
  compConfig: NgFormsInputConfig;
  inputChange: Subject<NgFormsInputConfig>;
  compOutput: (event: NgFormsOutputConfig) => void;
}

export const DEFAULT_BUTTON_CONFIG: FieldConfig[] = [
  {
    key: 'CLEAR',
    label: 'Clear',
    sequence: null,
    type: FieldType.BUTTON,
    tooltip: null,
    readonly: false,
    required: true,
    className: FlexPosition.FLEX_END,
  },
  {
    key: 'RESET',
    label: 'Reset',
    sequence: null,
    type: FieldType.BUTTON,
    tooltip: 'This will revert the filter changes to default settings',
    readonly: false,
    required: true,
    className: FlexPosition.FLEX_END,
  },
  {
    key: 'APPLY',
    label: 'Apply',
    sequence: null,
    type: FieldType.BUTTON,
    tooltip: null,
    readonly: false,
    required: true,
    className: FlexPosition.FLEX_END,
  },
  {
    key: 'SAVE',
    label: 'Save',
    sequence: null,
    type: FieldType.BUTTON,
    tooltip: 'This will save and replace the default settings with the new one',
    readonly: false,
    required: true,
    className: FlexPosition.FLEX_START,
  },
];
