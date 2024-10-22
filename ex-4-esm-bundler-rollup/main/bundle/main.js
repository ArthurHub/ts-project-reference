function logLocal() {
    console.log('Logging message in local file');
}

function logMessage() {
    console.log('Logging message in libs reference with ESM, full reference, and alias');
}

logLocal();
logMessage();
// to run:
// tsc --build && rollup -c rollup.config.js
