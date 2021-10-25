import { Router } from "express"

import { Route } from "../common/Route"
import { EnsureAuthenticated } from "../middlewares/EnsureAuthenticated"
import { ProfileUserController } from "../controllers/ProfileUserController"

class UsersRoutes extends Route {

  public applyRoutes(router: Router): void {
    router.get(
      '/users/profile',
      EnsureAuthenticated,
      new ProfileUserController().handle
    )
  }
}

export const usersRoutes = new UsersRoutes()