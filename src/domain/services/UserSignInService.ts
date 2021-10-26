import { sign } from 'jsonwebtoken'
import { config } from '../../core/config/environment'

import { AppError, AppErrorType } from '../../core/exception/AppError'
import { IHashProvider } from '../../core/providers/IHashProvider'
import { IUsersRepository } from '../repositories/IUsersRepository'

interface IAccessTokenResponse {
  access_token: string
}

interface IUserResponse {
  id: number
  name: string
  login: string
  avatar_url: string
}
interface IUserSignIn {
  login: string
  password: string
}

class UserSignInService {

  constructor(
    private repository: IUsersRepository,
    private hashProvider: IHashProvider
  ) { }

  async execute(entity: IUserSignIn) {
    const { login, password } = entity

    const user = await this.repository.findByLogin(login)
    if (!user) {
      throw new AppError({
        status: 401,
        type: AppErrorType.FORBIDDEN,
        userMessage: 'Login e/ou Senha não conferem'
      })
    }

    // Verify password
    const matchedPassword = await this.hashProvider.compareHash(password, user.password)
    if (!matchedPassword) {
      throw new AppError({
        status: 401,
        type: AppErrorType.FORBIDDEN,
        userMessage: 'Login e/ou Senha não conferem'
      })
    }

    // Generate token JWT
    const { SECRET, EXPIRES_IN } = config.JWT
    const token = sign(
      {
        user: {
          id: user.id,
          name: user.name,
          avatar_url: user.avatar_url
        }
      },
      SECRET,
      {
        subject: user.id,
        expiresIn: EXPIRES_IN
      }
    )

    delete user.password
    return {
      token, user
    }
  }
}

export { UserSignInService }