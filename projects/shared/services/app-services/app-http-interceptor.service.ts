import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Http request interceptor
 */
@Injectable()
export class AppHttpRequestInterceptor implements HttpInterceptor {
  /**
   * This function intercepts outgoing http requests,
   * we can do lots of dirty things before it goes out. This is global
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request);
  }
}

/**
 * Http response interceptor
 */
@Injectable()
export class AppHttpResponseInterceptor implements HttpInterceptor {
  /**
   * This function intercepts coming back response,
   * we can process the response if needed. This is global
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request);
  }
}
