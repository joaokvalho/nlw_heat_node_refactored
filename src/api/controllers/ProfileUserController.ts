import { Request, Response } from 'express'

import { UserProfileService } from '../../domain/services/UserProfileService'

class ProfileUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const service = new UserProfileService()
    const user = await service.execute(user_id)

    delete user.password
    delete user.github_id
    return response.status(200).json(user)
  }
}

export { ProfileUserController }