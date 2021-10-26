import { Request, Response } from 'express'

import * as result from '../common/ResponseType'
import { IUser } from '../../domain/dto/IUser'
import { UsersRepository } from '../../infra/prisma/repositories/UsersRepository'
import { UserSignInService } from '../../domain/services/UserSignInService'
import { BCryptHashProvider } from '../../infra/providers/BCryptHashProvider'

interface IAuthResponse {
  token: string
  user: IUser
}

class UserSignInController {
  async handle(request: Request, response: Response) {
    const { login, password } = request.body

    const service = new UserSignInService(
      new UsersRepository(),
      new BCryptHashProvider()
    )
    const user = await service.execute({
      login,
      password
    })

    return result.ok<IAuthResponse>(response, user)
  }
}

export { UserSignInController }