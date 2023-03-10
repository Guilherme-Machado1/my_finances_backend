import { HttpResponse } from "../interfaces/interfaces"

export const badRequest = (body: any): HttpResponse => {
  return {
    body: body,
    statusCode: 400
  }

}

export const unauthorized = (body: any): HttpResponse => {
  return {
    body: body,
    statusCode: 401
  }

}

export const success = (body: any): HttpResponse => {
  return {
    body: body,
    statusCode: 200
  }
}
