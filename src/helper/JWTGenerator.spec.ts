import JWTGenerator from "./JWTGenerator"



describe('Jwt tests', () => {
  it('Should return a token ', async() => {
    const jwt = new JWTGenerator();
    const dummyUser = {
      name: 'valid_name',
      email: 'valid_email@gmail.com'
    }

    const token = jwt.generateJWT(dummyUser);
    expect(token).toBeDefined();
  })

  it('Should return the user that will be decrypted from the token ', async() => {
    const jwt = new JWTGenerator();
    const dummyUser = {
      name: 'valid_name',
      email: 'valid_email@gmail.com'
    }

    const token = jwt.generateJWT(dummyUser);
    const decoded = jwt.verify(token)
    expect(decoded).toEqual({
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      exp: expect.any(Number),
      iat: expect.any(Number),
    })
  })

  it('Should return error if the token is not valid ', async() => {
    const jwt = new JWTGenerator();
    expect(() => jwt.verify('invalid token')).toThrow();

  })
})
