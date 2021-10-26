import { IUsersRepository } from "../repositories/IUsersRepository"

class UserProfileService {

  constructor(private repository: IUsersRepository) { }

  async execute(user_id: string) {
    const user = await this.repository.findById(user_id)

    return user
  }
}

export { UserProfileService }