import prismaClient from '../'

import { IMessageCreate } from "../../../domain/dto/IMessageCreate.dto"
import { IMessage } from "../../../domain/dto/IMessage.dto"
import { IMessagesRepository } from '../../../domain/repositories/IMessagesRepository'

export class MessagesRepository implements IMessagesRepository {

  private prisma

  constructor() {
    this.prisma = prismaClient
  }

  public async findLast3Message(): Promise<IMessage[]> {
    const messages = await this.prisma.message.findMany({
      take: 3,
      include: {
        user: true
      },
      orderBy: {
        created_at: "desc"
      },
    })

    return messages
  }

  public async save({ message, user_id }: IMessageCreate): Promise<IMessage> {
    const data = {
      text: message,
      user_id
    }
    const messageCreated = await this.prisma.message.create({
      data,
      include: {
        user: true,
      }
    })

    return messageCreated
  }

}
