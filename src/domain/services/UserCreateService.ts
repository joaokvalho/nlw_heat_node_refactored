import { AppError, AppErrorType } from '../../core/exception/AppError'

import { IUserCreate } from '../dto/IUserCreate.dto'
import { IUsersRepository } from '../repositories/IUsersRepository'

class UserCreateService {

  constructor(private repository: IUsersRepository) { }

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

    const userCreated = await this.repository.save(entity)
    return userCreated
  }
}

export { UserCreateService }