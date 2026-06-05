// NPM Modules
import { Global, Module } from '@nestjs/common';

// Custom Modules
import LoggerService from './logger.service';

/**
 * Global so every module can inject {@link LoggerService} without re-importing
 * this module or re-providing the service. Imported once in {@link AppModule}.
 */
@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService]
})
export default class LoggerModule {}
