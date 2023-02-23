export interface EncrypterProtocol {
  encrypt(password: string): Promise<string>
  decrypt(password: string, passwordDb: string): Promise<boolean>
}
