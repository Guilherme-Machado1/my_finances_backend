import { Request, Response } from "express";
import { HttpResponse } from "../interfaces/interfaces";
import { HttpRequest } from "../interfaces/interfaces"
import { AuthControllerProtocol } from "../protocols/AuthController";
import { AuthServiceProtocol } from "../protocols/AuthServiceProtocol";

class AuthController implements AuthControllerProtocol {
  private authService: AuthServiceProtocol
  constructor(authService: AuthServiceProtocol){
    this.authService = authService;
  }

  public index(req: Request, res: Response): void {
    res.status(200).json({msg: 'funcionando index'})
  }
  public signUp = async(req: Request, res: Response): Promise<void> =>{
    const body: HttpRequest = req.body
    const userSignUp = await this.authService.signUp(body)
    res.status(userSignUp.statusCode).json({msg: 'funcionando signUp', userSignUp})

  }

  public signIn = async(req: Request, res: Response): Promise<void> =>{
    const body: HttpRequest = req.body
    const userSignIn = await this.authService.signIn(body)
    res.status(200).json({msg: 'funcionando signIn', userSignIn})

  }
}
export default AuthController;
