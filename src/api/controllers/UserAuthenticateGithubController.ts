import { Request, Response } from 'express'

import { UserAuthenticateGithubService } from '../../domain/services/UserAuthenticateGithubService'

class UserAuthenticateGithubController {
  async handle(request: Request, response: Response) {
    const { code } = request.body

    const service = new UserAuthenticateGithubService()

    try {
      const result = await service.execute(code)

      return response.json(result)
    } catch (err) {
      return response.json({ "error": err.message })
    }
  }
}

export { UserAuthenticateGithubController }