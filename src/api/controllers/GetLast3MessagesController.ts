import { Request, Response } from 'express'

import * as result from '../common/ResponseType'
import { GetLast3MessagesService } from '../../domain/services/GetLast3MessagesService'
import { MessagesRepository } from '../../infra/prisma/repositories/MessagesRepository'
import { IMessage } from '../../domain/dto/IMessage.dto'

class GetLast3MessagesController {
  async handle(request: Request, response: Response) {

    const service = new GetLast3MessagesService(new MessagesRepository())
    const listMessages = await service.execute()

    return result.ok<IMessage[]>(response, listMessages)
  }
}

export { GetLast3MessagesController }