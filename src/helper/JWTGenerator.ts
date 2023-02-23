import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({path: path.resolve(__dirname, '..', '..', '.env')})

const secret: string = process.env.secret!

interface JWTPayload {
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface UserInterface {
  email: string;
  name: string;
}
class JWTGenerator {
  public generateJWT(user: UserInterface){
    const token = jwt.sign({
      name: user.name,
      email: user.email
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
