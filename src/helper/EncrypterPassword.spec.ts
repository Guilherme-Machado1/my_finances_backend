import EncryptPassword from "./EncryptPassword";
describe('Encrypter tests', () => {
  it('should not return the password without the encryption ', async() => {
    const encrypter = new EncryptPassword(10);
    const password = '123456'
    const passwordHashed = encrypter.encrypt(password);
    expect(passwordHashed).not.toBe(password)
  })

  it('should return true if the password is equal to the hasshed Password', async() => {
    const encrypter = new EncryptPassword(10);
    const password = '123456'
    const passwordHashed = '$2b$10$G35jPHtcPmHpeL2eUOPQNegaTrnMMNxfihOdOanugwjHoTdGxNyYm'
    const decryptPassword = await encrypter.decrypt(password, passwordHashed);
    expect(decryptPassword).toBe(true)
  })
})
