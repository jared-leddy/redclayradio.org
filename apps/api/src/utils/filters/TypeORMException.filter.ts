// NPM Modules
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

/**
 * Postgres SQLSTATE codes mapped to their HTTP-meaningful translations.
 *
 * Codes not listed here fall through to a 500 InternalServerErrorException so
 * unexpected database failures aren't silently masked as 400s — an unknown DB
 * error is a bug to investigate, not a client mistake.
 *
 * @see https://www.postgresql.org/docs/current/errcodes-appendix.html
 */
const POSTGRES_ERROR_TRANSLATIONS: Record<
  string,
  { exception: new (message: string) => HttpException; defaultMessage: string }
> = {
  '22001': {
    exception: BadRequestException,
    defaultMessage: 'A field value exceeds its maximum length.'
  },
  '22P02': {
    exception: BadRequestException,
    defaultMessage: 'A field value has an invalid format.'
  },
  '23502': {
    exception: BadRequestException,
    defaultMessage: 'A required field is missing.'
  },
  '23503': {
    exception: BadRequestException,
    defaultMessage: 'Referenced record does not exist.'
  },
  '23505': {
    exception: ConflictException,
    defaultMessage: 'A record with these values already exists.'
  },
  '23514': {
    exception: BadRequestException,
    defaultMessage: 'A field value violates a database constraint.'
  }
};

@Catch(QueryFailedError)
export default class TypeORMExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('TypeORMExceptionFilter');

  catch(exception: QueryFailedError, host: ArgumentsHost): void {
    const driverError = exception.driverError as { code?: string; detail?: string } | undefined;
    const code = driverError?.code;

    this.logger.error(`QueryFailedError [${code ?? 'unknown'}]: ${exception.message}`, driverError?.detail);

    const translation = code ? POSTGRES_ERROR_TRANSLATIONS[code] : undefined;
    const httpException = translation
      ? new translation.exception(translation.defaultMessage)
      : new InternalServerErrorException('An unexpected database error occurred.');

    const response = host.switchToHttp().getResponse<Response>();
    response.status(httpException.getStatus()).json(httpException.getResponse());
  }
}
