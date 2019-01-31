import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Helper {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  static generateToken(id) {
    const token = jwt.sign({
      userId: id,
    }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
  }
}

export default Helper;
