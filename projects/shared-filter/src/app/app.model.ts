import { Subject } from 'rxjs';
import {
  SharedFilterInputConfig,
  SharedFilterOutputConfig,
} from './filter/modules/shared-filter/shared-filter.model';

export interface SharedFilterConfig {
  compConfig: SharedFilterInputConfig;
  inputChange: Subject<SharedFilterInputConfig>;
  compOutput: (event: SharedFilterOutputConfig) => void;
}
