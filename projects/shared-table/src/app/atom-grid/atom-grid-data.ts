export interface Definition {
  componentId: number;
  componentTypeId: number;
  name: string;
  description: string;
  componentType: string;
  roleId: number;
}

export interface Config {
  configName: string;
  configValue: string;
  rs_Type: string;
}

export interface Column {
  fieldId: number;
  fieldName: string;
  headerText: string;
  minWidth: number;
  width: number;
  sortable: boolean;
  alignment: string;
  displayOrder: number;
  showInd: number;
  showExcelInd: number;
  rs_Type: string;
  fieldDataType: string;
  parentFieldId?: number;
  flex?: number;
  hasSumColumn?: boolean;
}

export interface DataDefinition {
  definition: Definition;
  config: Config[];
  columns: Column[];
}
