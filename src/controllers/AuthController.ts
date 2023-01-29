import { HttpRequest } from "../interfaces/interfaces"
import AuthService from "../services/AuthService"
class AuthController {
  public authService = new AuthService()
  public signUp(): any{
    const body: HttpRequest = {name: 'any_name', email: 'any_email', password: 'any_password'}
    const userSignUp = this.authService.signUp(body)
    return userSignUp;

  }
}
export default AuthController;
