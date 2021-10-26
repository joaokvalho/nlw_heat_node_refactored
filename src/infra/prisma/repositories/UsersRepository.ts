import prismaClient from '../'

import { IUser } from '../../../domain/dto/IUser'
import { IUserCreate } from '../../../domain/dto/IUserCreate.dto'
import { IUsersRepository } from '../../../domain/repositories/IUsersRepository'

export class UsersRepository implements IUsersRepository {

  private prisma

  constructor() {
    this.prisma = prismaClient
  }

  public async findById(id: string): Promise<IUser> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })

    return user
  }

  public async findByGithubId(githubId: number): Promise<IUser> {
    const user = await this.prisma.user.findUnique({
      where: { github_id: githubId }
    })

    return user
  }

  public async findByLogin(login: string): Promise<IUser> {
    const user = await this.prisma.user.findUnique({
      where: {
        login: login
      },
    })

    return user
  }

  public async save({ name, login, password, avatar_url, github_id }: IUserCreate): Promise<IUser> {
    const userCreated = await this.prisma.user.create({
      data: {
        name,
        login,
        password,
        avatar_url,
        github_id
      },
    })

    return userCreated
  }

}
