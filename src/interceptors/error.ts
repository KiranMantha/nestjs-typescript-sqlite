import {
  CallHandler,
  ExecutionContext,
  HttpException,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

interface ErrorResponse {
  validationErrors: string[];
  status: {
    success: boolean;
    statusCode: number;
  };
}

export class ErrorInterceptor implements NestInterceptor<any, ErrorResponse> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ErrorResponse> {
    return next.handle().pipe(
      catchError((err) => {
        return throwError(() => {
          return new HttpException(
            {
              validationErrors: [JSON.stringify(err)],
              status: {
                success: false,
                statusCode: 500,
              },
            },
            500
          );
        });
      })
    );
  }
}
