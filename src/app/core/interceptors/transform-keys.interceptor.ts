import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { transformCollKeys, stringToCamel, stringToSnake } from '../index';


/** Pass untouched request through to the next request handler. */
@Injectable()
export class TransformKeysInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (req.body) {
      const newRequest = req.clone({
        body: transformCollKeys(req.body, stringToSnake),
      });
      console.log(newRequest);
      return next.handle(newRequest);
    }

    return next.handle(req)
      .pipe(
        map((event) => {
          if (event instanceof HttpResponse && event.body) {
            return event.clone({
              body: transformCollKeys(event.body, stringToCamel),
            });
          }

          return event;
        }),
      );
  }

}
