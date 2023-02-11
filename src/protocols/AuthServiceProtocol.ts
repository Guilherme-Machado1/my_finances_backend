import { HttpRequest, HttpResponse } from "../interfaces/interfaces";

export interface AuthServiceProtocol {
  signUp(userData: HttpRequest): Promise<HttpResponse>
  signIn(userData: HttpRequest): Promise<HttpResponse>
}
