const bcrypt = require('bcryptjs');

const hashPassword = async password => {
  if (!password) {
    throw new Error('Password was not provided');
  }

  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(password, salt);
  return result;
}

// actual hashedPassword in database
const verifyPassword = async (candidate, actual) => {
  if (!candidate || !actual) throw new Error('candidate password or actual password must be provided!');
  const result = await bcrypt.compare(candidate, actual);
  return result;
}


module.exports = { hashPassword, verifyPassword };
