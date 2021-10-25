import { ICreateMessage } from "../dto/ICreateMessage.dto"
import { IMessage } from "../dto/IMessage.dto"

export interface IMessagesRepository {
  findLas3Message(): Promise<IMessage[]>
  save(entity: ICreateMessage): Promise<IMessage>
}