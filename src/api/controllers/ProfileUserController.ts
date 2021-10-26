import { Request, Response } from 'express'

import * as result from '../common/ResponseType'
import { IUser } from '../../domain/dto/IUser'
import { UserProfileService } from '../../domain/services/UserProfileService'
import { UsersRepository } from '../../infra/prisma/repositories/UsersRepository'

class ProfileUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const service = new UserProfileService(
      new UsersRepository()
    )
    const user = await service.execute(user_id)

    delete user.password
    delete user.github_id

    return result.ok<IUser>(response, user)
  }
}

export { ProfileUserController }