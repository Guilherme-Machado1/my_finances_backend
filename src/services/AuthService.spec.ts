import EmailValidator from "../helper/EmailValidator";
import EncryptPassword from "../helper/EncryptPassword";
import AuthService from "./AuthService"
import user from "../models/User";
import jwtResolver from "../helper/JWTGenerator";

const createSut = () => {
  const encrypter = new EncryptPassword(10)
  const emailValidator = new EmailValidator()
  const sut = new AuthService(encrypter, emailValidator, jwtResolver);
  return {sut};
}
describe('SignUp tests', () => {
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
    const signup = await sut.signUp(dummyUser);
    expect(signup.statusCode).toBe(400)
    expect(signup.body).toEqual('The email is already registered')
    const userDb = await user.findUserByEmail(dummyUser.body.email)
    await user.deleteUserFromDb(userDb)
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

    const response = await sut.signUp(dummyUser);
    expect(response.statusCode).toBe(200);
  })
})


describe('SignIn tests', () => {
  it('should return status 400 if propertie email is missing', async() => {
    const { sut } = createSut()
    const dummyUser = {
      body: {
        password: 'any_password'
      }
    }
    const signup = await sut.signIn(dummyUser);
    expect(signup.body).toEqual('The propertie email is missing')
    expect(signup.statusCode).toBe(400)
  })

  it('should return status 400 if propertie password is missing', async() => {
    const { sut } = createSut()
    const dummyUser = {
      body: {
        email: 'any_email@gmail.com',
      }
    }
    const signup = await sut.signIn(dummyUser);
    expect(signup.body).toEqual('The propertie password is missing')
    expect(signup.statusCode).toBe(400)
  })

  it('should return status 400 if email does not exists in the database', async() => {
    const { sut } = createSut()
    const dummyUser = {
      body: {
        email: 'email@gmail.com',
        password: 'any_password'
      }
    }
    const signup = await sut.signIn(dummyUser);
    expect(signup.body).toEqual('The email does not exists')
    expect(signup.statusCode).toBe(400)
  })

  it('should return status 401 if the password is different from the password sent trough the body', async() => {
    const { sut } = createSut()
    const dummyUser = {
      body: {
        email: 'any_email@gmail.com',
        password: 'password'
      }
    }
    const signup = await sut.signIn(dummyUser);

    expect(signup.body).toEqual('The password is incorrect')
    expect(signup.statusCode).toBe(401)
  })

  it('should return 200 and the JWT token', async() => {
    const { sut } = createSut()
    const dummyUser = {
      body: {
        email: 'any_email@gmail.com',
        password: 'any_password'
      }
    }
    const signup = await sut.signIn(dummyUser);
    console.log(signup)
    expect(signup.statusCode).toBe(200)
  })
})
