// NPM Modules
import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// Custom Modules
import LoggerService from 'src/logger/logger.service';

/**
 * Global response interceptor with two responsibilities:
 *
 * 1. Wraps every successful response body in a `{ data: ... }` envelope so
 *    clients see a consistent shape across endpoints.
 * 2. Logs every HTTP request after it completes — the response status code,
 *    duration, and the request body (and, on failure, the error message).
 *    Logging goes through {@link LoggerService}, which redacts sensitive fields
 *    in the body before it is written.
 *
 * Error responses are not wrapped — they flow through Nest's exception filters
 * and reach the client in whatever shape the filter produces.
 */
@Injectable()
export default class DataResponse implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const response: Response = context.switchToHttp().getResponse<Response>();
    const method = request.method;
    const url = request.originalUrl || request.url;
    const startedAt = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startedAt;
          this.logger.log(
            `HTTP ${method} ${url} → ${response.statusCode} (${duration}ms)`,
            'HTTP',
            JSON.stringify(request.body ?? {})
          );
        },
        error: (err: unknown) => {
          const duration = Date.now() - startedAt;
          const status = err instanceof HttpException ? err.getStatus() : 500;
          const message = err instanceof Error ? err.message : 'unknown error';
          this.logger.warn(
            `HTTP ${method} ${url} → ${status} (${duration}ms) — ${message}`,
            'HTTP',
            JSON.stringify(request.body ?? {})
          );
        }
      }),
      map((data: unknown) => ({ data }))
    );
  }
}
