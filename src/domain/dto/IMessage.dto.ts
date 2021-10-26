interface IUser {
  id: string
  name: string
  login: string
  avatar_url: string
  password: string
}

export interface IMessage {
  id?: number
  text: string
  user: IUser
  created_at: string
}