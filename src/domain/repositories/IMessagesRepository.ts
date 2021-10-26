import { IMessageCreate } from "../dto/IMessageCreate.dto"
import { IMessage } from "../dto/IMessage.dto"

export interface IMessagesRepository {
  findLast3Message(): Promise<IMessage[]>
  save(entity: IMessageCreate): Promise<IMessage>
}