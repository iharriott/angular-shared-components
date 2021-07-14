import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgFormsConfig } from './app.model';
import { Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  FieldConfig,
  NgFormsInputConfig,
  NgFormsOutputConfig,
} from './form/modules/shared-forms/shared-forms.model';
import {
  AppConfig,
  AppData,
  getConfig,
  getData,
} from './form/modules/shared-forms/shared-forms.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  /*** Local Variables ***/
  title = 'shared-form';
  outputData: any;
  /*** End of Local Variables ***/
  /*** Child Components ***/
  ngFormsConfig: NgFormsConfig | null | undefined;

  /*** End of Child Components ***/

  /**
   * Constructor
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  /*** Start of Life Cycle Implementation ***/

  /**
   * Implementation for OnInit
   * @return void
   */
  ngOnInit(): void {
    this.initThisComponent();
    this.getData();
  }

  /*** End of Life Cycle Implementation ***/

  /*** Start of Public Functions ***/

  /*** End of Public Functions ***/

  /*** Start of Private Functions ***/
  /**
   * Function to init this component
   * @return void
   * @private
   */
  private initThisComponent(): void {
    this.ngFormsConfig = {
      compConfig: {
        options: {
          isShow: false,
        },
        data: {
          fieldConfig: null,
          fieldData: null,
        },
      },
      inputChange: new Subject<NgFormsInputConfig>(),
      compOutput: (event: NgFormsOutputConfig): void => {
        // console.log('testing', event);
        this.outputData = event.value;
      },
    };
  }

  /**
   * Function to prepare data
   * @return void
   * @private
   */
  private getData(): void {
    const data: AppData = getData;
    const config: AppConfig[] = getConfig;

    const fieldConfigs: FieldConfig[] = [];
    Object.keys(data).forEach((key: string) => {
      const appConfig: AppConfig | undefined = config.find(
        (cfg: AppConfig) => cfg.fieldName == key
      );
      if (appConfig) {
        const messages: any = {
          firstName: {
            required: 'This is a required field',
            maxlength: 'Max value allowed is 2',
          },
        };
        const fieldConfig: FieldConfig = {
          key: appConfig.fieldName,
          label: appConfig.fieldLabel,
          sequence: appConfig.displayOrder,
          fieldType: appConfig.fieldType,
          tooltip: appConfig.tooltip,
          info: appConfig.info,
          hint: appConfig.hint,
          readonly: appConfig.readOnly,
          fieldValidators: appConfig.validation
            ? Validators.compose([Validators.required, Validators.maxLength(2)])
            : Validators.compose([Validators.nullValidator]),
          validationMessages: messages,
          options: appConfig.options,
        };
        fieldConfigs.push(fieldConfig);
      }
    });
    if (this.ngFormsConfig) {
      this.ngFormsConfig.compConfig.options = {
        isShow: true,
        isError: false,
        readonly: false,
      };
      this.ngFormsConfig.compConfig.data = {
        ...this.ngFormsConfig?.compConfig.data,
        fieldConfig: {
          dynamicFormName: 'TestDynamicForm',
          fieldGroups: [
            {
              fieldGroupClassName: 'row',
              fieldTemplateType: 'default',
              fieldConfig: fieldConfigs,
            },
            {
              fieldGroupClassName: 'column',
              fieldTemplateType: 'default',
              fieldConfig: fieldConfigs,
            },
            {
              fieldGroupClassName: 'column',
              fieldTemplateType: 'custom',
              fieldConfig: fieldConfigs,
            },
          ],
        },
        fieldData: data,
      };
      // FYI: This is how you need to update the child component
      // this.ngFormsConfig?.inputChange.next(this.ngFormsConfig?.compConfig);
    }
  }

  /*** End of Private Functions ***/
}
