require('module-alias/register'); // required for nodejs!

import { logLocal } from '@deep/logger';
import { logMessage } from '@libs/common';

logLocal();

logMessage();

// to run:
// tsc --build && node dist\main.js
