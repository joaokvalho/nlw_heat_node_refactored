import { Request, Response } from 'express'

import * as result from '../common/ResponseType'
import { IUser } from '../../domain/dto/IUser'
import { UserCreateService } from '../../domain/services/UserCreateService'
import { UsersRepository } from '../../infra/prisma/repositories/UsersRepository'

class UserSignupController {
  async handle(request: Request, response: Response) {
    const {
      name,
      login,
      password,
      avatar_url
    } = request.body

    const service = new UserCreateService(
      new UsersRepository()
    )
    const user = await service.execute({
      name,
      login,
      password,
      avatar_url
    })

    delete user.password
    delete user.github_id

    return result.created<IUser>(response, user)
  }
}

export { UserSignupController }