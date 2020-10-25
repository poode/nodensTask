const userService = require('../services/userService');
const pkg = require('../package.json');

exports.getHome = async (req, res) => { 
    res.render('index', {
        version: pkg.version,
    });
}

exports.messagePage = (req, res, next) => {
  const {
    success,
    error,
    url,
    msg
  } = req.query;
  res.render('message', {
    url: decodeURIComponent(url),
    success: success === 'true' ? true : false,
    error: error === 'true' ? true : false,
    message: msg,
  });
}


exports.renderLogin = (req, res) => {
  return res.render('login', { layout: 'login' });
}

exports.login = async (req, res, next) => {
  const response = await userService.userLogin(req);
  if (!response.data) return next(response);
  res.cookie('token', response.data.token, { expires: response.data.time, signed: true });
  res.cookie('username', `${response.data.firstName}, ${response.data.lastName}`, { expires: response.data.time });
  res.redirect('/');
}

exports.create = async (req, res, next) => {
  const response = await userService.userRegister(req);
  if (!response.user) return next(response);
  const url = encodeURIComponent(`/`);
  return res.redirect(`/message?success=${true}&url=${url}`);
}

exports.logout =  (req, res) => {
  if(req.signedCookies.token){
    res.clearCookie('token');
    res.clearCookie('username');
  }
  res.redirect('/login');
}
