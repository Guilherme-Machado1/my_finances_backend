import jwtResolver from "./JWTGenerator"



describe('Jwt tests', () => {
  it('Should return a token ', async() => {
    const dummyUser = {
      name: 'valid_name',
      email: 'valid_email@gmail.com'
    }

    const token = jwtResolver.generateJWT(dummyUser.email, dummyUser.name);
    expect(token).toBeDefined();
  })

  it('Should return the user that will be decrypted from the token ', async() => {
    const dummyUser = {
      name: 'valid_name',
      email: 'valid_email@gmail.com'
    }

    const token = jwtResolver.generateJWT(dummyUser.email, dummyUser.name);
    const decoded = jwtResolver.verify(token)
    expect(decoded).toEqual({
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      exp: expect.any(Number),
      iat: expect.any(Number),
    })
  })

  it('Should return error if the token is not valid ', async() => {
    expect(() => jwtResolver.verify('invalid token')).toThrow();

  })
})
