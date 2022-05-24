import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
interface Response<T> {
  validationErrors: string[];
  status: {
    success: boolean;
    statusCode: number;
  };
  data: T;
}

export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: T) => {
        return {
          validationErrors: [],
          status: {
            success: true,
            statusCode: 200
          },
          data
        };
      })
    );
  }
}
