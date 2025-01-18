import { EResponseStatus } from '@/models/enums/auth.enum';
import { TSuccessResponse } from '@/models/types/auth.type';
import utils from '@/utils';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const { convertToCamelCase, convertToSnakeCase } = utils.shared;

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<TSuccessResponse> {
    const request = context.switchToHttp().getRequest();

    if (request.body) request.body = convertToCamelCase(request.body);

    return next.handle().pipe(
      map((data) => {
        const successResponse: TSuccessResponse = {
          data: convertToSnakeCase(data.data) || null,
          meta: convertToSnakeCase(data.meta) || null,
          status: EResponseStatus.Success,
        };
        return successResponse;
      }),
    );
  }
}
