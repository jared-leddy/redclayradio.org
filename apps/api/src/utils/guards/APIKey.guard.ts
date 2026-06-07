// NPM Modules
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

/**
 * Global guard that authenticates every request by comparing the
 * `redclayradio-api-key` header against the server's `API_KEY` secret. Requests
 * with a missing or mismatched key are rejected with 401 before they reach any
 * handler.
 */
@Injectable()
export default class APIKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['redclayradio-api-key'];

    if (apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException('Invalid or missing API key.');
    }

    return true;
  }
}
