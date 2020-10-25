const jwt = require('jsonwebtoken');

exports.authUser =  (req, res, next) => {
  if(req.originalUrl === '/login') {
    const {token} = req.signedCookies;
    if(!token) {
      return res.redirect('/login');
    }
    return next();
  }
  let user;
  try {
    user = jwt.verify(token, process.env.SECRET_SALT);
  } catch (error) {
    console.log('AuthUser Error >>>>', error);
    res.clearCookie('token');
    res.clearCookie('username');
    return res.redirect('/login');
  }
  res.locals.user = user;
  next();
}

exports.checkToken = (req, res, next) => {
  if (req.originalUrl === '/') {
    if(!req.signedCookies.token){
      return res.redirect('/login');
    } 
  } 
  if (req.originalUrl === '/login') {
    if(req.signedCookies.token){
      return res.redirect('/');
    } 
  }
  next();
} 
