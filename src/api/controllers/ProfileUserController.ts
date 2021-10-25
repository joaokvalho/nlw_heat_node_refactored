import { Request, Response } from 'express'

import { ProfileUserService } from '../../domain/services/ProfileUserService'

class ProfileUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const service = new ProfileUserService()
    const user = await service.execute(user_id)

    delete user.password
    delete user.github_id
    return response.status(200).json(user)
  }
}

export { ProfileUserController }