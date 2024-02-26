import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {authFeatureKey, authReducer} from './auth/store/reducers';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import * as authEffects from './auth/store/effects';
import * as feedEffects from './shared/components/feed/store/effects';
import * as popularTagsEffects from './shared/components/popularTags/store/effects';
import {provideRouterStore, routerReducer} from '@ngrx/router-store';
import {authInterceptor} from './shared/services/authInterceptor';
import {
  feedFeatureKey,
  feedReducer,
} from './shared/components/feed/store/reducers';
import {
  popularTagsFeatureKey,
  popularTagsReducer,
} from './shared/components/popularTags/store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    provideStore({router: routerReducer}),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    provideEffects(authEffects, feedEffects, popularTagsEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 25,
    }),
  ],
};
