import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { ApiError } from '@burand/angular';
import { Observable, catchError } from 'rxjs';

import { environment } from '@environment';

export function apiErrorInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(request).pipe(
    catchError(err => {
      if (!request.url.startsWith(environment.urlApi)) {
        throw err;
      }

      if (err instanceof HttpErrorResponse && err.error.code && err.error.message) {
        throw new ApiError(err.error.code, err.status);
      }

      throw err;
    })
  );
}
