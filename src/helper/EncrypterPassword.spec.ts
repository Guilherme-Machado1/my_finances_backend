import EncryptPassword from "./EncryptPassword";
describe('Encrypter tests', () => {
  it('should not return the password without the encryptation ', async() => {
    const encrypter = new EncryptPassword(10);
    const password = '123456'
    const passwordHashed = encrypter.encrypt(password);
    expect(passwordHashed).not.toBe(password)
  })
})
