const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true, jsonPointers: true });
require('ajv-errors')(ajv);

const validate = schema => {
    return (req, res, next) => {
      let requestBody = {};
      for (const key in req.fields) {
        if (req.fields.hasOwnProperty(key)) {

          // this to be sure that no null or undefined types in request fields
          // Note that req.fields will be instead of req.body due to middleware
          // used to handle json, forms, and uploading files
          if(req.fields[key] === undefined ||
            req.fields[key] === null
            ) {
              req.fields[key] = '';
            }

          // this to trim any string
          if (typeof req.fields[key] === 'string') {
            const element = req.fields[key].trim();
            requestBody[key] = element;
          }
        }
      }
      if (!process.env.NODE_ENV === 'production') {
        console.log('req.fields >>>>>> ', requestBody , new Date().toLocaleString());
      }
      const validation = ajv.compile(schema);
      const valid = validation(requestBody);
      if (!valid) {
        // string with all errors as an array
        return res.status(422).render( 'message', { error: validation.errors , status:422 });
      }
      next();
    };
  };

  module.exports = validate;
