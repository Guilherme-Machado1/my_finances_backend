import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import path from 'path'
import { JwtProtocol } from '../protocols/JwtProtocol'
dotenv.config({path: path.resolve(__dirname, '..', '..', '.env')})

const secret: string = process.env.secret!

interface UserInterface {
  email: string;
  name: string;
}
class JWTGenerator implements JwtProtocol {
  public generateJWT(email: string, name: string){
    const token = jwt.sign({
      name: name,
      email: email
    }, secret, {
      expiresIn: '1d'
    }) as string;

    return token;
  }

  public verify(token: string){
    const decode = jwt.verify(token, secret);
    return decode;
  }
}

const jwtResolver = new JWTGenerator()
export default jwtResolver;
