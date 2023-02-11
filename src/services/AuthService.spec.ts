import EmailValidator from "../helper/EmailValidator";
import EncryptPassword from "../helper/EncryptPassword";
import AuthService from "./AuthService"

const createSut = () => {
  const encrypter = new EncryptPassword(10)
  const emailValidator = new EmailValidator()
  const sut = new AuthService(encrypter, emailValidator);
  return {sut};
}
describe('Auth tests', () => {
  it('should return status 400 if propertie name is missing', async() => {
    const { sut } = createSut()
    const dummyUser = {
      body: {
        email: 'any_email@gmail.com',
        password: 'any_password'
      }
    }
    const signup = await sut.signUp(dummyUser);
    expect(signup.body).toEqual('The propertie name is missing')
    expect(signup.statusCode).toBe(400)
  })

  it('should return status 400 if propertie email is missing', async() => {
    const { sut } = createSut()
    const dummyUser = {
      body: {
        name: 'any_name',
        password: 'any_password'
      }
    }
    const signup = await sut.signUp(dummyUser);
    expect(signup.body).toEqual('The propertie email is missing')
    expect(signup.statusCode).toBe(400)
  })

  it('should return status 400 if propertie password is missing', async() => {
    const { sut } = createSut()
    const dummyUser = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
      }
    }
    const signup = await sut.signUp(dummyUser);
    expect(signup.body).toEqual('The propertie password is missing')
    expect(signup.statusCode).toBe(400)
  })

  it('should return status 400 if E-mail is not valid', async() => {
    const { sut } = createSut()
    const dummyUser = {
      body: {
        name: 'any_name',
        email: 'email_not_valid',
        password: 'any_password'
      }
    }
    const signup = await sut.signUp(dummyUser);
    expect(signup.statusCode).toBe(400)
    expect(signup.body).toEqual('E-mail is not valid')
  })

  it('should return status 200 if it is all good', async() => {
    const { sut } = createSut()
    const dummyUser = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password'
      }
    }
    const signup = await sut.signUp(dummyUser);
    const hashPassword = await signup.body.body.password
    expect(signup.statusCode).toBe(200)
    expect(signup.body.body).toEqual({name: 'any_name', email: 'any_email@gmail.com', password: hashPassword})
  })
})
