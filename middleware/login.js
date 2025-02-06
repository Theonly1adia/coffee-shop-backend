const User = require('../models/User');
const jwt = require('jsonwebtoken');
async function checkEmail(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
async function checkPassword(req, res, next) {
  try {
    const { password } = req.body;
    const isMatch = await req.user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    next();
  } catch (error) {
    next(error);
  }
}
async function signToken(req, res, next) {
  try {
    const userId = req.user._id;
    const role = req.user.role;
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { checkEmail, checkPassword, signToken };