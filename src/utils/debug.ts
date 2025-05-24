const DEBUG = process.env.NODE_ENV === 'development';

export const debugLog = (...args: any[]) => {
  if (DEBUG) {
    console.log('[Debug]:', ...args);
  }
};

export const debugError = (...args: any[]) => {
  if (DEBUG) {
    console.error('[Error]:', ...args);
  }
};