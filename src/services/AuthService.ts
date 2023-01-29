import { HttpResponse, HttpRequest } from "../interfaces/interfaces"
import { badRequest, success } from "../protocols/returnFunctions"
import { EncrypterProtocol } from "../protocols/EncrypterProtocol"
import { EmailValidatorProtocol } from "../protocols/EmailValidatorProtocol"
class AuthService {
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

    const hashPassword = await this.encryptPassword.encrypt(userData.body.password);

    userData.body.password = hashPassword;

    return success(userData)
  }
}

export default AuthService
