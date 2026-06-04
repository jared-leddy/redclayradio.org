// NPM Modules
import { Injectable, Logger } from '@nestjs/common';
import chalk from 'chalk';
import { URL } from 'url';

/**
 * NestJS logger that redacts sensitive fields in structured data and URL query
 * parameters before writing each line. Drop-in replacement for the built-in
 * `Logger`, with the same level methods (`debug`, `log`, `warn`, `error`, `verbose`).
 */
@Injectable()
export default class LoggerService extends Logger {
  /** Sensitive fields for structured data (JSON, objects). */
  private sensitiveDataKeys = new Set(
    [
      'accessToken',
      'apiKey',
      'clientSecret',
      'cookie',
      'password',
      'passwordConfirm',
      'passwordResetToken',
      'revalidateToken',
      'token'
    ].map((k) => k.toLowerCase())
  );

  /** Sensitive fields for URL query parameters. */
  private sensitiveQueryParams = new Set(['auth-id', 'auth-password', 'apiKey', 'token'].map((k) => k.toLowerCase()));

  /**
   * Recursively redacts sensitive keys from a value. Strings that look like
   * JSON (start with `{` or `[`) are parsed and walked; other primitives pass
   * through. Already-visited references are replaced with `'[Circular]'`.
   *
   * @param data - Value to sanitize.
   * @param seen - Internal cycle-tracking set; callers should not pass this.
   */
  private sanitizeData(data: unknown, seen: WeakSet<object> = new WeakSet()): unknown {
    if (!data) return data;

    let parsedData: unknown = data;

    if (typeof data === 'string') {
      const trimmed = data.trimStart();
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        try {
          parsedData = JSON.parse(data) as unknown;
        } catch {
          return data;
        }
      }
    }

    if (typeof parsedData !== 'object' || parsedData === null) return parsedData;

    if (seen.has(parsedData)) return '[Circular]';
    seen.add(parsedData);

    if (Array.isArray(parsedData)) {
      return parsedData.map((item) => this.sanitizeData(item, seen));
    }

    if (!this.isRecord(parsedData)) return parsedData;

    return Object.keys(parsedData).reduce(
      (acc: Record<string, unknown>, key: string) => {
        acc[key] = this.sensitiveDataKeys.has(key.toLowerCase())
          ? '[Redacted]'
          : this.sanitizeData(parsedData[key], seen);
        return acc;
      },
      {} as Record<string, unknown>
    );
  }

  /** Type guard for plain objects (excludes arrays and `null`). */
  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  /**
   * Redacts sensitive query parameters from every `http(s)://` URL found in
   * the input. Trailing punctuation around a URL (e.g. a sentence-ending
   * period) is preserved outside the rewritten URL. URL fragments are kept.
   */
  private sanitizeURL(url: string): string {
    return url.replace(/https?:\/\/\S+/g, (raw) => {
      const trailingMatch = raw.match(/[.,;:!?)\]>"']+$/);
      const trailing = trailingMatch ? trailingMatch[0] : '';
      const candidate = trailing ? raw.slice(0, -trailing.length) : raw;

      try {
        const parsedUrl = new URL(candidate);
        const params = parsedUrl.searchParams;

        Array.from(params.keys()).forEach((key) => {
          if (this.sensitiveQueryParams.has(key.toLowerCase())) {
            params.set(key, '[Redacted]');
          }
        });

        const queryString = params.toString();
        return (
          parsedUrl.origin + parsedUrl.pathname + (queryString ? `?${queryString}` : '') + parsedUrl.hash + trailing
        );
      } catch {
        return raw;
      }
    });
  }

  /**
   * Builds the final colored log line: sanitizes URLs in `message`, redacts
   * sensitive keys in `data`, and prefixes with the context tag.
   */
  private formatMessage(level: string, message: unknown, context?: string, data?: unknown): string {
    const prefix = context ? `[Logger-${context}]: ` : '[Logger] ';
    const colorFn = this.getColorFunction(level);

    const sanitizedMessage = typeof message === 'string' ? this.sanitizeURL(message) : (message as string);
    const mainMessage = colorFn(`${prefix}${sanitizedMessage}`);

    const redactedData = data ? this.sanitizeData(data) : null;
    const dataMessage = redactedData ? colorFn(`Data: ${JSON.stringify(redactedData)}`) : '';

    return data ? `${mainMessage} ${dataMessage}` : mainMessage;
  }

  /** Returns the chalk color function for a given log level. */
  private getColorFunction(level: string): (text: string) => string {
    switch (level) {
      case 'error':
        return chalk.red;
      case 'warn':
        return chalk.yellow;
      case 'log':
        return chalk.blue;
      case 'debug':
        return chalk.magenta;
      case 'verbose':
        return chalk.cyan;
      default:
        return chalk.white;
    }
  }

  /** Writes a debug-level message with optional structured `data`. */
  debug(message: unknown, context?: string, data?: unknown): void {
    super.debug(this.formatMessage('debug', message, context, data));
  }

  /** Writes an error-level message, optionally followed by a stack `trace`. */
  error(message: unknown, trace?: string, context?: string, data?: unknown): void {
    super.error(this.formatMessage('error', message, context, data));
    if (trace) {
      super.error(chalk.red(trace));
    }
  }

  /** Writes a verbose-level message; falls back to `debug` outside production. */
  verbose(message: unknown, context?: string, data?: unknown): void {
    if (process.env.NODE_ENV === 'production') {
      super.verbose(this.formatMessage('verbose', message, context, data));
    } else {
      this.debug(message, context, data);
    }
  }

  /** Writes a log-level message; falls back to `debug` outside production. */
  log(message: unknown, context?: string, data?: unknown): void {
    if (process.env.NODE_ENV === 'production') {
      super.log(this.formatMessage('log', message, context, data));
    } else {
      this.debug(message, context, data);
    }
  }

  /** Writes a warn-level message with optional structured `data`. */
  warn(message: unknown, context?: string, data?: unknown): void {
    super.warn(this.formatMessage('warn', message, context, data));
  }
}
