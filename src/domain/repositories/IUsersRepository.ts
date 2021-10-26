import { IUser } from "../dto/IUser"
import { IUserCreate } from "../dto/IUserCreate.dto"

export interface IUsersRepository {
  findById(id: string): Promise<IUser>
  findByLogin(login: string): Promise<IUser>
  findByGithubId(githubId: number): Promise<IUser>
  save(entity: IUserCreate): Promise<IUser>
}