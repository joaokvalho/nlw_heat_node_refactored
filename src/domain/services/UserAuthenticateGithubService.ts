import axios from 'axios'
import { sign } from 'jsonwebtoken'

import { config } from '../../core/config/environment'
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

class UserAuthenticateGithubService {

  constructor(private repository: IUsersRepository) { }

  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token"

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: config.GITHUB.CLIENT_ID,
        client_secret: config.GITHUB.CLIENT_SECRET,
        code
      },
      headers: {
        Accept: 'application/json',
      },
    })

    const response = await axios.get<IUserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    })

    const { id, name, login, avatar_url } = response.data

    let user = await this.repository.findByGithubId(id)

    if (!user) {
      const data = {
        name,
        login,
        github_id: id,
        avatar_url,
      }
      user = await this.repository.save(data)
    }

    const token = sign(
      {
        user: {
          id: user.id,
          name: user.name,
          avatar_url: user.avatar_url
        }
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d"
      }
    )

    delete user.password
    return {
      token, user
    }

  }
}

export { UserAuthenticateGithubService }