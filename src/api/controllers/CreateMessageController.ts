import { Request, Response } from 'express'

import * as result from '../common/ResponseType'

import { CreateMessageService } from '../../domain/services/CreateMessageService'
import { MessagesRepository } from '../../infra/prisma/repositories/messages.repository'

class CreateMessageController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const { message } = request.body

    const service = new CreateMessageService(
      new MessagesRepository()
    )

    const createdMessage = await service.execute({ message, user_id })

    return result.created(response, createdMessage)
  }
}

export { CreateMessageController }