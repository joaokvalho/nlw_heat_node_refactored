import { IMessage } from '../dto/IMessage.dto'
import { IMessagesRepository } from '../repositories/imessages.repository'

export class GetLast3MessagesService {

  constructor(private repository: IMessagesRepository) { }

  public async execute(): Promise<IMessage[]> {
    const messages = await this.repository.findLas3Message()

    return messages
  }
}