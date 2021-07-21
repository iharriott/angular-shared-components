import { Subject } from 'rxjs';
import {
  NgFormsInputConfig,
  NgFormsOutputConfig,
} from './form/modules/shared-forms/shared-forms.model';

export interface SharedFormsConfig {
  compConfig: NgFormsInputConfig;
  inputChange: Subject<NgFormsInputConfig>;
  compOutput: (event: NgFormsOutputConfig) => void;
}
