// import { logMessage } from '../../libs/src/common'; // doesn't work
import { logMessage } from '../../libs/dist/common'; // feels wrong

logMessage();

// to run:
// tsc --build && node dist\main.js
