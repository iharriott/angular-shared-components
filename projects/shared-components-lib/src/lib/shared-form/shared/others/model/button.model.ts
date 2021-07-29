import { FieldType, FlexPosition } from '../constants/field.constants';

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
