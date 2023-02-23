import { HttpResponse, HttpRequest } from "../interfaces/interfaces"
import { badRequest, success } from "../protocols/returnFunctions"
import { EncrypterProtocol } from "../protocols/EncrypterProtocol"
import { EmailValidatorProtocol } from "../protocols/EmailValidatorProtocol"
import { v4 as uuidv4 } from 'uuid';
import user from "../models/User";
import { AuthServiceProtocol } from "../protocols/AuthServiceProtocol";

class AuthService implements AuthServiceProtocol {
  private encryptPassword: EncrypterProtocol
  private emailValidator: EmailValidatorProtocol
  constructor(encryptPassword: EncrypterProtocol, emailValidator: EmailValidatorProtocol){
    this.encryptPassword = encryptPassword;
    this.emailValidator = emailValidator
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

    return success(userData)
  }
}

export default AuthService
