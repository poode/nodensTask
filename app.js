const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const formidableMiddleware = require('express-formidable');

const { trimBody } = require('./middleware/trimBody');
const userRouter = require('./routes/users');
const { logErrorAndExit, errorTypes } = require('./core/logErrorAndExit');
const { ServerError } = require('./util/ServerError');

const app = express();
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev', { skip: () => process.env.NODE_ENV === 'production'}));

// Note that req.fields will be used instead of req.body
// due to middleware used to handle forms, and uploading files
app.use(formidableMiddleware());

app.use(cookieParser(process.env.SECRET_SALT));
app.use(express.static(path.join(__dirname, 'public')));

app.use(trimBody);
app.use('/', userRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(new ServerError('الصفحة غير موجودة', 404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log('Error Name >>>>>>>>', err.name)
  console.log('Requested URL >>>>>>>>>', req.url)
  // console.log('Normal Error >>>>>>>>>>', err )

  // if no status then this error should mot be handled and let it bubble up
  // to fix it
  if(!err.status) {
    logErrorAndExit(err, errorTypes.exception);
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status);
  res.render('message', { error: err.message });
});

module.exports = { app };
