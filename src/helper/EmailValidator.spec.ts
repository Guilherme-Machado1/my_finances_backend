import EmailValidator from "./EmailValidator"
describe('Encrypter tests', () => {
  it('should return true if the email is valid ', async() => {
    const email = 'any_email@gmail.com'
    const emailValidator = new EmailValidator();
    const verifyEmail = emailValidator.emailValidator(email)
    expect(verifyEmail).toBe(true)
  })

  it('should return false if the email is not valid ', async() => {
    const email = 'any_email'
    const emailValidator = new EmailValidator();
    const verifyEmail = emailValidator.emailValidator(email)
    expect(verifyEmail).toBe(false)
  })
})
