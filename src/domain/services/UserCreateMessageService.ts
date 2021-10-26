import { io } from '../../../server'
import { ICreateMessage } from '../dto/ICreateMessage.dto'
import { IMessagesRepository } from '../repositories/IMessagesRepository'

class UserCreateMessageService {

  constructor(private repository: IMessagesRepository) { }

  async execute(entity: ICreateMessage) {
    const newMessage = await this.repository.save(entity)

    const infoWS = {
      text: newMessage.text,
      user_id: newMessage.user.id,
      created_at: newMessage.created_at,
      user: {
        id: newMessage.user.id,
        name: newMessage.user.name,
        avatar_url: newMessage.user.avatar_url
      }
    }

    io.emit("new_message", infoWS)

    return newMessage
  }
}

export { UserCreateMessageService }