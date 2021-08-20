import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { transformCollKeys } from './helpers/transform-collection-keys';
import { stringToCamel } from './helpers/string-to-camel';
import { stringToSnake } from './helpers/string-to-snake';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class CoreInterceptor implements HttpInterceptor {

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
            console.log(event.body)
            const newEvent = event.clone({
              body: transformCollKeys(event.body, stringToCamel),
            });
            console.log(newEvent);

            return newEvent;
          }
          return event;
        }),
      );
  }
}


// public intercept(httpRequest: HttpRequest<any>, next: HttpHandler) {
//   console.log(httpRequest);
  
//   if (httpRequest.responseType === 'json') {
//     return this.handleJsonResponse(httpRequest, next);
//   } else {
//     return next.handle(httpRequest);
//   }
// }

// private handleJsonResponse(httpRequest: HttpRequest<any>, next: HttpHandler) {
//   return next.handle(httpRequest).pipe(map(event => this.parseJsonResponse(event)));
// }

// private parseJsonResponse(event: HttpEvent<any>) {
//   if (event instanceof HttpResponse) {
//     //return event.clone({body: this.jsonParser.parse(event.body)});
//     console.log(event.body);
    
//     return event;
//   } else {
//     return event;
//   }
// }