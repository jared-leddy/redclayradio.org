// NPM Modules
import { Controller, Get } from '@nestjs/common';

// Custom Modules
import LineupService from './lineup.service';

// route: /lineup
@Controller('lineup')
export default class LineupController {
  constructor(private lineupService: LineupService) {}

  /**
   * Returns the current broadcast day's running order: the two acts on the
   * stages and everyone on deck behind them.
   */
  // route: /lineup
  @Get()
  lineupReadCurrent() {
    return this.lineupService.getCurrent();
  }
}
