import { Request, Response } from 'express'
import { GetLast3MessagesService } from '../../domain/services/GetLast3MessagesService'

class GetLast3MessagesController {
  async handle(request: Request, response: Response) {
    const service = new GetLast3MessagesService()
    const listMessages = await service.execute()

    return response.status(200).json(listMessages)
  }
}

export { GetLast3MessagesController }