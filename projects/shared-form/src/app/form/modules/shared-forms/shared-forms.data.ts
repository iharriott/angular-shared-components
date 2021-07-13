export interface AppData {
  firstName: string;
  lastName: string;
  organization: string;
  role: string;
  status: string;
  isActive: boolean;
  favoriteSeason: string;
  startDate: string | null;
  checked: boolean;
  buttonToggle: string | null;
}

export const getData: AppData = {
  firstName: 'joe',
  lastName: 'campbell',
  organization: 'Uptake',
  role: 'developer',
  status: 'active',
  isActive: true,
  favoriteSeason: 'summer',
  startDate: null,
  checked: true,
  buttonToggle: null,
};

export interface AppConfig {
  fieldId: string;
  componentId: string;
  parentFieldId: string;
  fieldType: string;
  fieldLabel: string;
  fieldName: string;
  displayOrder: number;
  showInd: number;
  flex: number;
  hint?: string;
  tooltip?: string;
  info?: string;
  readOnly?: boolean;
  validation?: {
    fn?: string;
    val?: string | number | null;
  };
  options?: AppOptionObject[];
}

export interface AppOptionObject {
  optionKey: string;
  labelValues: OptionValue[];
}

export interface OptionValue {
  label: string;
  value: string | number | boolean;
}

export const getConfig: AppConfig[] = [
  {
    fieldId: '1',
    componentId: '2',
    parentFieldId: '',
    fieldType: 'input',
    fieldLabel: 'First Name',
    fieldName: 'firstName',
    displayOrder: 1,
    showInd: 1,
    flex: 1,
    validation: {
      fn: 'maxLen',
      val: 1,
    },
  },
  {
    fieldId: '2',
    componentId: '2',
    parentFieldId: '',
    fieldType: 'input',
    fieldLabel: 'Last Name',
    fieldName: 'lastName',
    displayOrder: 1,
    showInd: 1,
    flex: 1,
  },
  {
    fieldId: '3',
    componentId: '2',
    parentFieldId: '',
    fieldType: 'input',
    fieldLabel: 'Organization',
    fieldName: 'organization',
    displayOrder: 1,
    showInd: 1,
    flex: 1,
    readOnly: true,
    hint: 'This is the hint',
    info: 'Sample Info Text',
  },
  {
    fieldId: '4',
    componentId: '2',
    parentFieldId: '',
    fieldType: 'input',
    fieldLabel: 'Role',
    fieldName: 'role',
    displayOrder: 1,
    showInd: 1,
    flex: 1,
    hint: 'This is the hint',
    tooltip: 'Sample Tooltip',
  },
  {
    fieldId: '5',
    componentId: '2',
    parentFieldId: '',
    fieldType: 'select',
    fieldLabel: 'Status',
    fieldName: 'status',
    displayOrder: 1,
    showInd: 1,
    flex: 1,
    hint: 'This is the hint',
    tooltip: 'Sample Tooltip',
    info: 'Sample Info Text',
    options: [
      {
        optionKey: 'status',
        labelValues: [
          { label: 'Active', value: 'active' },
          { label: 'In Active', value: 'inactive' },
        ],
      },
    ],
  },
  {
    fieldId: '6',
    componentId: '2',
    parentFieldId: '',
    fieldType: 'toggle',
    fieldLabel: 'Is Active',
    fieldName: 'isActive',
    displayOrder: 1,
    showInd: 1,
    flex: 1,
    hint: 'This is the hint',
    tooltip: 'Sample Tooltip',
    info: 'Sample Info Text',
  },
  {
    fieldId: '7',
    componentId: '2',
    parentFieldId: '',
    fieldType: 'radio',
    fieldLabel: 'Favorite Season',
    fieldName: 'favoriteSeason',
    displayOrder: 1,
    showInd: 1,
    flex: 1,
    hint: 'This is the hint',
    tooltip: 'Sample Tooltip',
    info: 'Sample Info Text',
    options: [
      {
        optionKey: 'favoriteSeason',
        labelValues: [
          { label: 'Winter', value: 'winter' },
          { label: 'Summer', value: 'summer' },
          { label: 'Spring', value: 'spring' },
          { label: 'Autumn', value: 'autumn' },
        ],
      },
    ],
  },
  {
    fieldId: '8',
    componentId: '2',
    parentFieldId: '',
    fieldType: 'date',
    fieldLabel: 'Start Date',
    fieldName: 'startDate',
    displayOrder: 1,
    showInd: 1,
    flex: 1,
    hint: 'This is the hint',
    tooltip: 'Sample Tooltip',
    info: 'Sample Info Text',
  },
  {
    fieldId: '9',
    componentId: '2',
    parentFieldId: '',
    fieldType: 'checkbox',
    fieldLabel: 'Checked',
    fieldName: 'checked',
    displayOrder: 1,
    showInd: 1,
    flex: 1,
    hint: 'This is the hint',
    tooltip: 'Sample Tooltip',
    info: 'Sample Info Text',
  },
  {
    fieldId: '10',
    componentId: '2',
    parentFieldId: '',
    fieldType: 'buttonToggle',
    fieldLabel: 'Style Selection',
    fieldName: 'buttonToggle',
    displayOrder: 1,
    showInd: 1,
    flex: 1,
    hint: 'This is the hint',
    tooltip: 'Sample Tooltip',
    info: 'Sample Info Text',
    options: [
      {
        optionKey: 'buttonToggle',
        labelValues: [
          { label: 'Bold', value: 'bold' },
          { label: 'Italic', value: 'italic' },
          { label: 'Underline', value: 'underline' },
        ],
      },
    ],
  },
];
