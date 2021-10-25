import { Request, Response } from 'express'

import { GetLast3MessagesService } from '../../domain/services/GetLast3MessagesService'
import { MessagesRepository } from '../../infra/prisma/repositories/messages.repository'

class GetLast3MessagesController {
  async handle(request: Request, response: Response) {

    const service = new GetLast3MessagesService(new MessagesRepository())
    const listMessages = await service.execute()

    return response.status(200).json(listMessages)
  }
}

export { GetLast3MessagesController }