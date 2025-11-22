const logInfo = (params: any) =>
  process.env.NODE_ENV !== 'test' && console.log('\x1b[33m', 'INFO: ', '\x1b[37m', ...params);
const logError = (params: any) =>
  process.env.NODE_ENV !== 'test' && console.error('\x1b[31m', 'ERROR: ', '\x1b[37m', ...params);

export { logInfo, logError };
