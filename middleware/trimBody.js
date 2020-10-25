exports.trimBody = (req, res, next) => {
  if(req.fields) {
    for (const key in req.fields) {
      if (req.fields.hasOwnProperty(key) && typeof req.fields[key] === 'string') {
        req.fields[key] = req.fields[key].trim();
      }
    }
  }
  return next();
};
