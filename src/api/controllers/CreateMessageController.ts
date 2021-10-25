import { Request, Response } from 'express'

import * as result from '../common/ResponseType'

import { CreateMessageService } from '../../domain/services/CreateMessageService'

class CreateMessageController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const { message } = request.body

    const service = new CreateMessageService()
    const createdMessage = await service.execute({ message, user_id })

    return result.created(response, createdMessage)
  }
}

export { CreateMessageController }