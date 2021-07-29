import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedOthersModule } from './others/shared-others.module';
import { SharedServicesModule } from './services/shared-services.module';

@NgModule({
  imports: [CommonModule, SharedOthersModule, SharedServicesModule],
  exports: [SharedOthersModule],
  declarations: [],
})
export class SharedModule {
  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    if (parentModule) {
      throw new Error(
        'SharedServicesModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  //Should only be used once in the root component
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }

  // Should be used in all component modules
  static forChild(): ModuleWithProviders<SharedOthersModule> {
    return {
      ngModule: SharedOthersModule,
    };
  }
}
