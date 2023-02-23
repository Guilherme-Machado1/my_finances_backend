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

  public async decrypt(password: string, passwordDb: string): Promise<boolean> {
    const hashedPassword = await bcrypt.compare(password, passwordDb)
    return hashedPassword;
}
}

export default EncryptPassword;
