import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Helper {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(id, isAdmin, firstname, lastname, email, phoneNumber) {
    const token = jwt.sign({
      id,
      isAdmin,
      firstname,
      lastname,
      email,
      phoneNumber,
    }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
  }
}

export default Helper;
