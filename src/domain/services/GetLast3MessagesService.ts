import { IMessage } from '../dto/IMessage.dto'
import { IMessagesRepository } from '../repositories/IMessagesRepository'

export class GetLast3MessagesService {

  constructor(private repository: IMessagesRepository) { }

  public async execute(): Promise<IMessage[]> {
    const messages = await this.repository.findLast3Message()

    return messages
  }
}