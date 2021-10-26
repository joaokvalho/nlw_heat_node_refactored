import { Request, Response } from 'express'

import * as result from '../common/ResponseType'
import { IUser } from '../../domain/dto/IUser'
import { UserAuthenticateGithubService } from '../../domain/services/UserAuthenticateGithubService'
import { UsersRepository } from '../../infra/prisma/repositories/UsersRepository'
import { AppError } from '../../core/exception/AppError'

interface IAuthResponse {
  token: string
  user: IUser
}

class UserAuthenticateGithubController {
  async handle(request: Request, response: Response) {
    const { code } = request.body

    const service = new UserAuthenticateGithubService(
      new UsersRepository()
    )

    try {
      const authResponse = await service.execute(code)

      return result.ok<IAuthResponse>(response, authResponse)
    } catch (err) {
      throw new AppError({ userMessage: err.message })
    }
  }
}

export { UserAuthenticateGithubController }