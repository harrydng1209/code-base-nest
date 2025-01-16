import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor<T> implements NestInterceptor {
  private readonly TIMEOUT_DURATION = 60 * 1000;

  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    return next.handle().pipe(
      timeout(this.TIMEOUT_DURATION),
      catchError((err) => {
        if (err instanceof TimeoutError) return throwError(() => new RequestTimeoutException());
        return throwError(() => err);
      }),
    );
  }
}
