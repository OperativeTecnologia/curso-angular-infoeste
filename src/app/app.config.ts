import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { APP_INITIALIZER, ApplicationConfig, DEFAULT_CURRENCY_CODE, ErrorHandler, LOCALE_ID } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router, provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { errorTailorConfig } from '@burand/angular';
import { provideErrorTailorConfig } from '@ngneat/error-tailor';
import { TraceService, createErrorHandler } from '@sentry/angular';
import { QueryClient, provideAngularQuery } from '@tanstack/angular-query-experimental';
import { LUCIDE_ICONS, LucideIconProvider, icons } from 'lucide-angular';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideToastr } from 'ngx-toastr';

import { apiErrorInterceptor } from '@core/interceptors/api-error.interceptor';
import { jwtInterceptor } from '@core/interceptors/jwt.interceptor';
import { urlInterceptor } from '@core/interceptors/url.interceptor';
import { environment } from '@environment';
import { routes } from './routes/app.routes';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnimations(),
    provideToastr({
      progressBar: true
    }),
    provideErrorTailorConfig(errorTailorConfig),
    provideEnvironmentNgxMask(),
    provideHttpClient(withInterceptors([urlInterceptor, apiErrorInterceptor, jwtInterceptor])),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' })
    ),
    provideAngularQuery(new QueryClient({ defaultOptions: { queries: { throwOnError: true } } })),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: ErrorHandler, useValue: createErrorHandler() },
    { provide: TraceService, deps: [Router] },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {
        // empty-function
      },
      deps: [TraceService],
      multi: true
    },
    { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(icons) }
  ]
};
