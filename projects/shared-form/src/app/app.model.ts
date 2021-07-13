import { Subject } from 'rxjs';
import {
  NgFormsInputConfig,
  NgFormsOutputConfig,
} from './form/modules/shared-forms/shared-forms.model';

export interface NgFormsConfig {
  compConfig: NgFormsInputConfig;
  inputChange: Subject<NgFormsInputConfig>;
  compOutput: (event: NgFormsOutputConfig) => void;
}
