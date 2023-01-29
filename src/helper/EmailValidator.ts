import * as emailFunctions from 'email-validator';
class EmailValidator {

  public emailValidator(email: string): boolean {
    const verifyEmail = emailFunctions.validate(email);
    if(!verifyEmail){
      return false;
    }else{
      return true;
    }
  }
}

export default EmailValidator;
