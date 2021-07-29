export enum FieldType {
  INPUT = 'input',
  SELECT = 'select',
  TOGGLE = 'toggle',
  RADIO = 'radio',
  INPUT_DATE = 'date',
  CHECK_BOX = 'checkbox',
  BUTTON_TOGGLE = 'buttonToggle',
  BUTTON = 'button',
}

export enum TemplateType {
  DEFAULT = 'default',
  CUSTOM = 'custom',
}

export enum FormAction {
  RESET = 'RESET',
  CLEAR = 'CLEAR',
}

export enum ButtonAction {
  APPLY = 'APPLY',
  RESET = 'RESET',
  CLEAR = 'CLEAR',
  SAVE = 'SAVE',
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
