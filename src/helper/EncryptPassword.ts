import bcrypt from 'bcrypt'
import { EncrypterProtocol } from '../protocols/EncrypterProtocol';
class EncryptPassword implements EncrypterProtocol {
  private readonly salt: number;
  constructor(salt: number){
    this.salt = salt;
  }
  public async encrypt(password: string): Promise<string> {
      const hashedPassword = await bcrypt.hash(password, this.salt)
      return hashedPassword;
  }
}

export default EncryptPassword;
