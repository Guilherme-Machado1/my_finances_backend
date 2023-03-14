import { JwtPayload } from "jsonwebtoken";

interface UserInterface {
  email: string;
  name: string;
}
export interface JwtProtocol {
  generateJWT(email: string, name: string): string
  verify(token: string): string | JwtPayload
}
