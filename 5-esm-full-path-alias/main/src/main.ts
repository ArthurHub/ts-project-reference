import { logLocal } from '@deep/logger.js';
import { logMessage } from '@libs/common.js';

logLocal();

logMessage();

// to run:
// tsc --build && node --loader=esm-module-alias/loader --no-warnings dist\main.js
