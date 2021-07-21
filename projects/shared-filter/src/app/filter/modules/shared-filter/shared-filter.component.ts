import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  ActionButtonContext,
  ButtonActionType,
  DEFAULT_BUTTON_CONFIG,
  FieldConfig,
  FlexPosition,
  SharedFilterInputConfig,
  SharedFilterOutputConfig,
  SharedFormsConfig,
} from './shared-filter.model';
import {
  FormAction,
  NgFormsInputConfig,
  NgFormsOutputConfig,
} from '../../../../../../shared-form/src/app/form/modules/shared-forms/shared-forms.model';

@Component({
  selector: 'app-shared-filter',
  templateUrl: './shared-filter.component.html',
  styleUrls: ['./shared-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedFilterComponent implements OnInit, AfterViewInit, OnDestroy {
  /*** Start of External Variables ***/
  /*** End of External Variables ***/

  /*** Local Variables ***/
  private onDestroy$: Subject<void> = new Subject<void>();
  buttonContext: ActionButtonContext[] = [];
  position: typeof FlexPosition = FlexPosition;
  /*** End of Local Variables ***/

  /*** List all @Input variables***/
  @Input() compConfig: SharedFilterInputConfig | undefined;
  @Input() inputChange?: Subject<SharedFilterInputConfig> | undefined;
  /*** End of @Input Variables ***/

  /*** List all @Output variables***/
  @Output() compOutput?: Subject<SharedFilterOutputConfig> =
    new Subject<SharedFilterOutputConfig>();

  /*** End of @Output Variables ***/

  /*** Child Components ***/
  sharedFormsConfig: SharedFormsConfig | null | undefined;

  /*** End of Child Components ***/
  /**
   * Constructor
   * @param _changeDetectorRef
   */
  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

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
    this.inputChange &&
      this.inputChange
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((changes: SharedFilterInputConfig) => {
          changes && (this.compConfig = changes);
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
   * Function to refresh the component
   * @param e
   */
  refresh(): void {
    // console.log('Refresh --->');
  }

  /**
   * Function to get button context based on flex position
   * @return ActionButtonContext[]
   * @param type
   */
  getButtonContext(type: FlexPosition): ActionButtonContext[] {
    return this.buttonContext.filter(
      (btnContext: ActionButtonContext) => btnContext.context.position === type
    );
  }

  /*** End of Public Functions ***/

  /*** Start of Private Functions ***/

  /**
   * Function to initialize this component
   * @return void
   * @private
   */
  private initThisComponent(): void {
    this.initSharedFormsComponent();
    this.constructButtonContext();
    if (this.compConfig) {
      this.compConfig.options = {
        ...this.compConfig.options,
        isReady: true,
      };
      this._changeDetectorRef.detectChanges();
    }
  }

  /**
   * Function to init SharedFormsComponent
   * @return void
   * @private
   */
  private initSharedFormsComponent(): void {
    if (this.compConfig) {
      this.sharedFormsConfig = {
        compConfig: {
          options: {
            isShow: true,
            isError: false,
            readonly: false,
          },
          data: {
            fieldConfig: this.compConfig.data.fieldConfig,
            fieldData: this.compConfig.data.fieldData,
          },
        },
        inputChange: new Subject<NgFormsInputConfig>(),
        compOutput: (event: NgFormsOutputConfig): void => {
          console.log('testing', event);
        },
      };
    }
  }

  /**
   * Function to update data for Shared forms component
   * @return void
   * @private
   */
  private updateSharedFormsConfig(): void {
    this.sharedFormsConfig?.inputChange.next(
      this.sharedFormsConfig?.compConfig
    );
  }

  /**
   * Function to construct button contexts
   * @return void
   * @private
   */
  private constructButtonContext(): void {
    DEFAULT_BUTTON_CONFIG.forEach((config: FieldConfig) => {
      const buttonContext: ActionButtonContext = {
        context: {
          id: null,
          type: config.key,
          label: config.label,
          tooltip: config.tooltip,
          isShow: config.required,
          isDisable: config.readonly,
          position: config.className || FlexPosition.FLEX_END,
          click: (type: string) => {
            switch (type) {
              case ButtonActionType.APPLY:
                this.applyForm();
                break;
              case ButtonActionType.CLEAR:
                this.clearForm();
                break;
              case ButtonActionType.RESET:
                this.resetForm();
                break;
              case ButtonActionType.SAVE:
                this.saveForm();
                break;
              default:
                break;
            }
          },
        },
      };
      this.buttonContext && this.buttonContext.push(buttonContext);
    });
  }

  /**
   * Function to apply form
   * @return void
   * @private
   */
  private applyForm(): void {
    this.compOutput?.next({
      data: {},
    });
  }

  /**
   * Function to clear form
   * @return void
   * @private
   */
  private clearForm(): void {
    if (this.sharedFormsConfig) {
      this.sharedFormsConfig.compConfig.formAction = FormAction.CLEAR;
      this.sharedFormsConfig.compConfig.data.fieldData = null;
    }
    this.updateSharedFormsConfig();
  }

  /**
   * Function to reset form
   * @return void
   * @private
   */
  private resetForm(): void {
    if (this.sharedFormsConfig) {
      this.sharedFormsConfig.compConfig.formAction = FormAction.RESET;
      this.sharedFormsConfig.compConfig.data.fieldData =
        this.compConfig?.data.fieldData;
    }
    this.updateSharedFormsConfig();
  }

  /**
   * Function to save form
   * @return void
   * @private
   */
  private saveForm(): void {
    this.compOutput?.next({
      data: {},
    });
  }

  /*** End of Private Functions ***/
}
