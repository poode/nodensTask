const errorTypes = { 
  promise: 'promise',
  exception: 'exception',
}
exports.logErrorAndExit = (err, ErrorType) => {
  if (!(err instanceof Error) ) throw new Error('error must be instance of Error Class');
  if (!errorTypes[ErrorType]) throw new Error(`error type must be one of those ${Object.keys(errorTypes)}`);
  console.error(`${ErrorType} Error >>>>> `, err);
  process.exit(1);
}
exports.errorTypes = errorTypes;
