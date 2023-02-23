import { Router } from "express";
import AuthController from "../controllers/AuthController";
import EmailValidator from "../helper/EmailValidator";
import EncryptPassword from "../helper/EncryptPassword";
import AuthService from "../services/AuthService";

class AuthRouter {
  private router: Router;
  private authController: AuthController;
  constructor(){
    this.router = Router();
    const emailValidator = new EmailValidator()
    const encrypter = new EncryptPassword(10);
    const authService = new AuthService(encrypter, emailValidator);
    this.authController = new AuthController(authService);
    this.setupRoutes();
  }

  private setupRoutes(): void{
    this.router.get("/", this.authController.index);
    this.router.post("/signup", this.authController.signUp);
    this.router.post("/signin", this.authController.signIn);
  }

  public getRouter(): Router {
    return this.router;
  }
}

const authRouter = new AuthRouter().getRouter();
export default authRouter
