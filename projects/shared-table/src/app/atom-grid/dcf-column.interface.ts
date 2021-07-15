export interface DcfColumn {
  fieldId: number;
  fieldName: string;
  headerText: string;
  sortable: boolean; // stored as bit in the database
  displayOrder: number;
  fieldDataType?: string;
  minWidth?: number;
  flex?: number;
  alignment?: string;
  parentFieldId?: number;
  hasSumColumn?: boolean;
  // many more properties are returned from api, but not currently used
  // below properties are not coming from api, they are created in calculations in .ts file
  children?: DcfColumn[];
  colspan?: number;
  rowspan?: number;
}
