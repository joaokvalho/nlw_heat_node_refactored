import { PrismaClient } from '@prisma/client'

import { ICreateMessage } from "../../../domain/dto/ICreateMessage.dto"
import { IMessage } from "../../../domain/dto/IMessage.dto"
import { IMessagesRepository } from '../../../domain/repositories/imessages.repository'

export class MessagesRepository implements IMessagesRepository {

  private prismaClient

  constructor() {
    this.prismaClient = new PrismaClient()
  }

  public async findLast3Message(): Promise<IMessage[]> {
    const messages = await this.prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: "desc"
      },
      include: {
        user: true
      }
    })

    return messages
  }

  public async save({ message, user_id }: ICreateMessage): Promise<IMessage> {
    const data = {
      text: message,
      user_id
    }
    const createdMessage = await this.prismaClient.message.create({
      data,
      include: {
        user: true,
      }
    })

    return createdMessage
  }

}
