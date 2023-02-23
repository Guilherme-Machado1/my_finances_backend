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

  it('should return return a hashed Password', async() => {
    const { sut } = createSut()
    const dummyUser = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password'
      }
    };

    const expectedResponse = {
      statusCode: 200,
      body: {
        id: 'd6ac25cf-3014-452e-ae42-137874bae951',
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: '$2b$10$6S4D0Rmvmke0GXMipXee1O6SpECJnsoQEUiuxWhLlJiC1HANR5WCa'
      }
    }

  jest.spyOn(sut, 'signUp').mockResolvedValue(expectedResponse);
    const response = await sut.signUp(dummyUser)
    const pass = response.body.password
    const id = response.body.id
    expect(pass).toBeDefined()
    expect(id).toBeDefined()
  })

  it('should return status 400 if E-mail is already in use', async() => {
    const { sut } = createSut()
    const dummyUser = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password'
      }
    }
    const expectedResponse = {
      statusCode: 400,
      body: 'The email is already registered'
    }
    jest.spyOn(sut, 'signUp').mockResolvedValue(expectedResponse);
    const signup = await sut.signUp(dummyUser);
    expect(signup.statusCode).toBe(400)
    expect(signup.body).toEqual('The email is already registered')
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

    const expectedResponse = {
      statusCode: 200,
      body: {id: 'any_id',name: 'any_name', email: 'any_email@gmail.com', password: 'any_password_hashed'}
    };

    const spySignUp = jest.spyOn(sut, 'signUp').mockResolvedValue(expectedResponse);
    const response = await sut.signUp(dummyUser);
    expect(spySignUp).toHaveBeenCalledWith(dummyUser);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({id: 'any_id',name: 'any_name', email: 'any_email@gmail.com', password: 'any_password_hashed'});
  })
})
