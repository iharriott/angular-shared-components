import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SharedFormsErrorStateMatcher } from './shared-forms-error-state-matcher';
import { FieldType, FormAction, TemplateType } from '../shared/others/constants/field.constants';
import { NgFormsInputConfig, NgFormsOutputConfig } from './shared-forms.model';
import { FieldConfig, FieldGroup, LabelValue, OptionObject } from '../shared/others/model/field.model';

@Component({
  selector: 'app-shared-forms',
  templateUrl: './shared-forms.component.html',
  styleUrls: ['./shared-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedFormsComponent implements OnInit, AfterViewInit, OnDestroy {
  /*** Start of External Variables ***/
  $errorStateMatcher: SharedFormsErrorStateMatcher =
    new SharedFormsErrorStateMatcher();
  /*** End of External Variables ***/

  /*** Local Variables ***/
  private onDestroy$: Subject<void> = new Subject<void>();
  ngFormGroup: FormGroup;
  templateType: typeof TemplateType = TemplateType;
  fieldType: typeof FieldType = FieldType;
  /*** End of Local Variables ***/

  /*** List all @Input variables***/
  @Input() compConfig: NgFormsInputConfig | undefined;
  @Input() inputChange?: Subject<NgFormsInputConfig> | undefined;
  /*** End of @Input Variables ***/

  /*** List all @Output variables***/
  @Output() compOutput?: Subject<NgFormsOutputConfig> =
    new Subject<NgFormsOutputConfig>();

  /*** End of @Output Variables ***/

  /**
   * Constructor
   * @param _formBuilder
   * @param _changeDetectorRef
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.ngFormGroup = this._formBuilder.group({});
  }

  /*** Start of Life Cycle Implementation ***/

  /**
   * Implementation for OnInit
   * @return void
   */
  ngOnInit(): void {
    this.initThisComponent();
  }

  /**
   * Implementation for AfterViewInit
   * @return void
   */
  ngAfterViewInit(): void {
    this.subscribeToFormChanges();
    this.inputChange &&
    this.inputChange
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((changes: NgFormsInputConfig) => {
        changes && (this.compConfig = changes);
        this.processFormAction();
        this._changeDetectorRef.detectChanges();
      });
  }

  /**
   * Implementation for OnDestroy
   * @return void
   */
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  /*** End of Life Cycle Implementation ***/

  /*** Start of Public Functions ***/

  /**
   * Function to get fieldConfig from Form group
   * @param fg
   * @param index
   * @return FieldConfig
   */
  getConfig(fg: FormGroup, _index?: number): FieldConfig {
    return fg.controls['fieldConfig'].value as FieldConfig;
  }

  /**
   * Function to construct dynamic id
   * @param fg
   * @param index
   * @return FieldConfig
   */
  getId(fg: FormGroup, _index?: number): string {
    const cfg: FieldConfig = fg.controls['fieldConfig'].value as FieldConfig;
    return cfg.key + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Function to get messages from Form group
   * @param fg
   * @param index
   */
  getMessages(fg: FormGroup, _index?: number): any | null | undefined {
    const cfg: FieldConfig = fg.controls['fieldConfig'].value as FieldConfig;
    if (
      cfg &&
      cfg.validationMessages instanceof Object &&
      cfg.validationMessages.hasOwnProperty(cfg.key)
    ) {
      return cfg.validationMessages[cfg.key];
    }
    return null;
  }

  /**
   * Function to get options from Form group
   * @param fg
   * @param index
   * @return FieldConfig
   */
  getOptions(fg: FormGroup, _index?: number): LabelValue[] | [] {
    const cfg: FieldConfig = fg.controls['fieldConfig'].value as FieldConfig;
    if (cfg && Array.isArray(cfg.options) && cfg.options?.length > 0) {
      const optObject: OptionObject | undefined = cfg.options.find(
        (opt: OptionObject) => opt && opt.optionKey === cfg.key
      );
      return optObject ? optObject.labelValues : [];
    }
    return [];
  }

  /**
   * Function to refresh the form
   * @param e
   */
  refresh(): void {
    // console.log('Refresh --->');
  }

  /*** End of Public Functions ***/

  /*** Start of Private Functions ***/

  /**
   * Function to initialize this component
   * @return void
   * @private
   */
  private initThisComponent(): void {
    this.constructNgForm(
      this.compConfig?.data.fieldConfig?.fieldGroups,
      this.compConfig?.data.fieldData
    );
    this._changeDetectorRef.detectChanges();
  }

  /**
   * Function to construct constructNgForm filter group
   * @param fieldGroups
   * @param fieldData
   * @return void
   * @private
   */
  private constructNgForm(
    fieldGroups: FieldGroup[] | undefined | null,
    fieldData?: any | null
  ): void {
    this.initForm();
    if (fieldGroups && Array.isArray(fieldGroups) && fieldGroups.length > 0) {
      this.hydrateForm(fieldGroups, fieldData);
      if (this.compConfig) {
        this.compConfig.options = {
          ...this.compConfig.options,
          isReady: true
        };
        this.compConfig?.options?.readonly && this.ngFormGroup.disable();
      }
      // console.log('Form Value after construction--->', this.ngFormGroup.value);
    }
  }

  /**
   * Function to init forms
   * @return void
   * @private
   */
  private initForm(): void {
    this.ngFormGroup = this._formBuilder.group(
      {
        ngFormControls: null
      },
      {
        updateOn: 'change',
        validators: []
      }
    );
  }

  /**
   * Function to hydrate forms
   * @param fieldGroups
   * @param fieldData
   * @return void
   * @private
   */
  private hydrateForm(fieldGroups: FieldGroup[], fieldData?: any | null): void {
    if (fieldGroups) {
      this.ngFormGroup.setControl(
        'ngFormControls',
        this.constructNgFormControlArray(fieldGroups, fieldData)
      );
    }
  }

  /**
   * Function to construct controls filter array
   * @param fieldGroups
   * @param fieldData
   * @return FormArray
   * @private
   */
  private constructNgFormControlArray(
    fieldGroups: FieldGroup[],
    fieldData?: any | null
  ): FormArray {
    const formArray: FormArray = this._formBuilder.array([]);
    if (fieldGroups) {
      fieldGroups.forEach((fieldGroup: FieldGroup) => {
        formArray.push(
          this._formBuilder.group({
            groupClassName: fieldGroup.fieldGroupClassName,
            templateType: fieldGroup.fieldTemplateType,
            fieldConfigs: this.constructFieldConfigFormArray(
              fieldGroup.fieldConfig,
              fieldData
            )
          })
        );
      });
    }
    return formArray;
  }

  /**
   * Function to construct field config from filter array
   * @param fieldConfigs
   * @param fieldData
   * @return FormArray
   * @private
   */
  private constructFieldConfigFormArray(
    fieldConfigs: FieldConfig[],
    fieldData?: any | null
  ): FormArray {
    const formArray: FormArray = this._formBuilder.array([]);
    fieldConfigs.forEach((cfg: FieldConfig, _index?: number) => {
      formArray.push(
        this._formBuilder.group({
          fieldControl: [
            {
              value:
                fieldData instanceof Object && fieldData.hasOwnProperty(cfg.key)
                  ? fieldData[cfg.key]
                  : null,
              disabled: cfg.readonly
            },
            cfg.fieldValidators
          ],
          fieldConfig: [cfg]
        })
      );
    });
    return formArray;
  }

  /**
   * Function to prepare data for parent
   * @returns void
   * @private
   */
  private subscribeToFormChanges(): void {
    this.ngFormGroup.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.onDestroy$))
      .subscribe(() => {
        const formData: unknown[] = [];
        const ngControls: FormArray = this.getFormArrayByLocator(
          this.ngFormGroup,
          'ngFormControls'
        );
        if (ngControls instanceof FormArray) {
          ngControls.controls.forEach((controlFG: unknown) => {
            if (controlFG instanceof FormGroup) {
              const fieldConfigs: FormArray = this.getFormArrayByLocator(
                controlFG,
                'fieldConfigs'
              );
              const data: Record<string, unknown> = {};
              fieldConfigs.controls.forEach((fieldFG: unknown) => {
                if (fieldFG instanceof FormGroup) {
                  const config: FieldConfig =
                    fieldFG.controls['fieldConfig'].value;
                  data[config.key] = fieldFG.controls['fieldControl'].value;
                }
              });
              formData && formData.push(data);
            }
          });
        }
        const outputConfig: NgFormsOutputConfig = {
          value: formData
        };
        this.compOutput?.next(outputConfig);
      });
  }

  /**
   * Extract by locator for FormArray
   * @param parentForm
   * @param locator
   * @return FormArray
   */
  private getFormArrayByLocator(
    parentForm: FormGroup,
    locator: string
  ): FormArray {
    return parentForm.get(locator.split('.')) as FormArray;
  }

  /**
   * Function to process form action
   * @void
   * @private
   */
  private processFormAction(): void {
    if (this.compConfig && this.compConfig.formAction) {
      switch (this.compConfig.formAction) {
        case FormAction.CLEAR:
          if (
            this.compConfig?.data.fieldConfig?.fieldGroups &&
            Array.isArray(this.compConfig?.data.fieldConfig?.fieldGroups) &&
            this.compConfig?.data.fieldConfig?.fieldGroups.length > 0
          ) {
            this.hydrateForm(
              this.compConfig?.data.fieldConfig?.fieldGroups,
              null
            );
          }
          break;
        case FormAction.RESET:
          if (
            this.compConfig?.data.fieldConfig?.fieldGroups &&
            Array.isArray(this.compConfig?.data.fieldConfig?.fieldGroups) &&
            this.compConfig?.data.fieldConfig?.fieldGroups.length > 0
          ) {
            this.hydrateForm(
              this.compConfig?.data.fieldConfig?.fieldGroups,
              this.compConfig?.data.fieldData
            );
          }
          break;
        default:
          break;
      }
    }
  }

  /*** End of Private Functions ***/
}
