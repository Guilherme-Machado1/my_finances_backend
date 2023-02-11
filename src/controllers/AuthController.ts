import { HttpResponse } from "../interfaces/interfaces";
import { HttpRequest } from "../interfaces/interfaces"
import { AuthServiceProtocol } from "../protocols/AuthServiceProtocol";
class AuthController {
  private authService: AuthServiceProtocol
  constructor(authService: AuthServiceProtocol){
    this.authService = authService;
  }
  public signUp(): Promise<HttpResponse>{
    const body: HttpRequest = {body: {name: 'any_name', email: 'any_email', password: 'any_password'}}
    const userSignUp = this.authService.signUp(body)
    return userSignUp;

  }

  public signIn(): Promise<HttpResponse>{
    const body: HttpRequest = {body: {email: 'any_email', password: 'any_password'}}
    const userSignUp = this.authService.signIn(body)
    return userSignUp;

  }
}
export default AuthController;
