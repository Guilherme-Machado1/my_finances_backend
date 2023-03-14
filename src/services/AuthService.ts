import { HttpResponse, HttpRequest } from "../interfaces/interfaces"
import { badRequest, success, unauthorized } from "../protocols/returnFunctions"
import { EncrypterProtocol } from "../protocols/EncrypterProtocol"
import { EmailValidatorProtocol } from "../protocols/EmailValidatorProtocol"
import { v4 as uuidv4 } from 'uuid';
import user from "../models/User";
import { AuthServiceProtocol } from "../protocols/AuthServiceProtocol";
import { JwtProtocol } from "../protocols/JwtProtocol";

class AuthService implements AuthServiceProtocol {
  private encryptPassword: EncrypterProtocol
  private emailValidator: EmailValidatorProtocol
  private jwt: JwtProtocol
  constructor(
    encryptPassword: EncrypterProtocol,
    emailValidator: EmailValidatorProtocol,
    jwt: JwtProtocol
    ){
    this.encryptPassword = encryptPassword;
    this.emailValidator = emailValidator;
    this.jwt = jwt
  }
  public async signUp(userData: HttpRequest): Promise<HttpResponse>{
    const requiredFields = ['name', 'email', 'password']
    for(let field of requiredFields){
      if(!userData.body[field]){
        return badRequest(`The propertie ${field} is missing`)
      }
    }
    const emailVerification = this.emailValidator.emailValidator(userData.body.email)
    if(!emailVerification){
      return badRequest('E-mail is not valid')
    }

    const userExists = await user.findUserByEmail(userData.body.email)

    if(userExists?.length! >= 1){
      return badRequest(`The email is already registered`)
    }

    const hashPassword = await this.encryptPassword.encrypt(userData.body.password);

    userData.body.password = hashPassword;
    userData.body.id = uuidv4();

    const addUser = await user.addUserToDb(userData.body)
    if(addUser?.length !== 1){
      return badRequest(`Account not created`)
    }
    return success(addUser)
  }

  public async signIn(userData: HttpRequest): Promise<HttpResponse>{
    const requiredFields = ['email', 'password']
    for(let field of requiredFields){
      if(!userData.body[field]){
        return badRequest(`The propertie ${field} is missing`)
      }
    }

    const userExists = await user.findUserByEmail(userData.body.email)

    if(userExists?.length! === 0){
      return badRequest(`The email does not exists`)
    }

    const decryptPassword = await this.encryptPassword.decrypt(userData.body.password, userExists![0].password)

    if(!decryptPassword){
      return unauthorized('The password is incorrect')
    }


    const jwt = this.jwt.generateJWT(userExists![0].email, userExists![0].name)

    return success({...userData, jwt})
  }
}

export default AuthService
