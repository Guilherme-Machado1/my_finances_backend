import { Request, Response } from "express";

export interface AuthControllerProtocol {
  index(req: Request, res: Response): void
  signUp(req: Request, res: Response): Promise<void>
  signIn(req: Request, res: Response): Promise<void>
}
