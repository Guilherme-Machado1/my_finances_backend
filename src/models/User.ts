import AWS from 'aws-sdk'
import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({path: path.resolve(__dirname, '..', '..', '.env')})

let dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey:  process.env.SECRET_ACCESS_KEY
})

interface IUser {
  id: string
  name: string
  email: string
  password: string
}

class User {
  private table = 'User'
  constructor(){}

  public findUserByEmail = async(email: string): Promise<any[] | undefined> => {
    const params = {
      TableName: this.table,
      FilterExpression: '#field = :value',
      ExpressionAttributeNames: {
        '#field': 'email',
      },
      ExpressionAttributeValues: {
        ':value': email,
      },
    };

    try {
      const verifyEmail = await dynamoDB.scan(params).promise();
      return verifyEmail.Items;
    } catch (error) {
      console.log(error)
    }

  }

  public addUserToDb = async(user: IUser): Promise<any[] | undefined> => {
    const itemParams = {
      TableName: this.table,
      Item: {
        'id': user.id,
        'email':  user.email,
        'name': user.name,
        'password': user.password,
      },
    };

    try {
      await dynamoDB.put(itemParams).promise();
      const getUser = await this.findUserByEmail(user.email)
      return getUser;
    } catch (error) {
      console.log(error)
    }

  }


  public deleteUserFromDb = async(user: any): Promise<any | undefined> => {
    const itemParams = {
      TableName: this.table,
      Key: {
        'id': user[0].id,
        'email': 'any_email@gmail.com'
      }
    };

    try {
      const deleteUser = await dynamoDB.delete(itemParams).promise();
      return deleteUser;
    } catch (error) {
      console.log(error)
    }

  }
}
const user = new User();
export default user;
