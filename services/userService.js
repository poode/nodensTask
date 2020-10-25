const jwt = require('jsonwebtoken');

const db = require('../models')
const { ServerError } = require('../util/ServerError')
const { hashPassword, verifyPassword } = require('../util/passwordUtils')

const User = db.user;

async function userLogin (req) {
  const { username, password } = req.fields;
  
  const userFound = await User.findOne({ where: { username }});
  if(!userFound){
    return new ServerError('اسم المستخدم غير موجود', 404);
  }

  const rightPassword = await verifyPassword(password, userFound.password);
  if(!rightPassword) {
    return new ServerError('الرقم السري خطأ أو ربما اسم المستخدم غير موجود', 422);
  }

  const token = jwt.sign({
    username: userFound.username,
    firstName: userFound.firstName,
    lastName: userFound.lastName,
  }, process.env.SECRET_SALT, { expiresIn: '12h' });

  const localTime = Date.now();
  const time = new Date(localTime + 12*60*60*1000);

  return {
    data: {
      token,
      time, 
      firstName: userFound.firstName,
      lastName: userFound.lastName,
    }
  };
}

async function userRegister(req) {
  const {
    username,
    password,
    firstName,
    lastName,
  } = req.fields;

  const userFound = await User.findOne({ where: { username }});
  if (userFound) return new ServerError('اسم المستخدم مستخدم من قبل', 422);

  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    username,
    password: hashedPassword,
    firstName,
    lastName,
  });
  
  return { user };
}

module.exports = {
  userLogin,
  userRegister,
}
