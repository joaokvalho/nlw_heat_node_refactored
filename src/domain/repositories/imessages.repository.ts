import { ICreateMessage } from "../dto/ICreateMessage.dto"
import { IMessage } from "../dto/IMessage.dto"

export interface IMessagesRepository {
  findLast3Message(): Promise<IMessage[]>
  save(entity: ICreateMessage): Promise<IMessage>
}