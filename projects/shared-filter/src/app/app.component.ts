import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { FieldConfig } from '../../../shared-form/src/app/form/modules/shared-forms/shared-forms.model';
import {
  AppConfig,
  AppData,
  getConfig,
} from '../../../shared-form/src/app/form/modules/shared-forms/shared-forms.data';
import { Validators } from '@angular/forms';
import { SharedFilterConfig } from './app.model';
import {
  SharedFilterInputConfig,
  SharedFilterOutputConfig,
} from './filter/modules/shared-filter/shared-filter.model';
import { getData } from './app.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /*** Local Variables ***/
  title = 'shared-filter';
  outputData: any;
  /*** End of Local Variables ***/
  /*** Child Components ***/
  sharedFilterConfig: SharedFilterConfig | null | undefined;

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
    this.prepareData();
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
    this.sharedFilterConfig = {
      compConfig: {
        options: {
          isShow: false,
        },
        data: {
          fieldConfig: null,
          fieldData: null,
        },
      },
      inputChange: new Subject<SharedFilterInputConfig>(),
      compOutput: (event: SharedFilterOutputConfig): void => {
        this.outputData = event.data;
      },
    };
  }

  /**
   * Function to prepare data
   * @return void
   * @private
   */
  private prepareData(): void {
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
    if (this.sharedFilterConfig) {
      this.sharedFilterConfig.compConfig.options = {
        isShow: true,
        isError: false,
        readonly: false,
      };
      this.sharedFilterConfig.compConfig.data = {
        ...this.sharedFilterConfig?.compConfig.data,
        fieldConfig: {
          dynamicFormName: 'TestDynamicForm',
          fieldGroups: [
            {
              fieldGroupClassName: 'row',
              fieldTemplateType: 'default',
              fieldConfig: fieldConfigs,
            },
          ],
        },
        fieldData: data,
      };
      // FYI: This is how you need to update the child component
      // this.sharedFilterConfig?.inputChange.next(this.sharedFilterConfig?.compConfig);
      //console.log('testing filter app com');
    }
  }

  /*** End of Private Functions ***/
}
