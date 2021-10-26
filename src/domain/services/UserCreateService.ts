import { AppError, AppErrorType } from '../../core/exception/AppError'

import { IHashProvider } from '../../core/providers/IHashProvider'
import { IUserCreate } from '../dto/IUserCreate.dto'
import { IUsersRepository } from '../repositories/IUsersRepository'

class UserCreateService {

  constructor(
    private repository: IUsersRepository,
    private hashProvider: IHashProvider) { }

  async execute(entity: IUserCreate) {
    const { login } = entity

    const user = await this.repository.findByLogin(login)
    if (user) {
      throw new AppError({
        status: 409,
        type: AppErrorType.CONFLICT_ERROR,
        userMessage: 'Já existe um usuário com este login'
      })
    }

    // Create user
    const hashedPassword = await this.hashProvider.generateHash(entity.password)
    entity.password = hashedPassword
    const savedUser = await this.repository.save(entity)

    delete savedUser.password
    return savedUser
  }
}

export { UserCreateService }