import { Router } from "express"

import { celebrate, Segments, Joi } from 'celebrate'

import { Route } from "../common/Route"
import { AuthenticateUserController } from "../controllers/AuthenticateUserController"

class AuthRoutes extends Route {

  public applyRoutes(router: Router): void {
    router.post(
      '/auth/github',
      celebrate({
        [Segments.BODY]: {
          code: Joi.string().required(),
        },
      }),
      new AuthenticateUserController().handle
    )

    router.post(
      '/auth/signup',
      celebrate({
        [Segments.BODY]: {
          name: Joi.string().required(),
          login: Joi.string().required(),
          avatar_url: Joi.string(),
          password: Joi.string().required(),
        },
      }),
      new AuthenticateUserController().handle
    )

    router.post(
      '/auth/signIn',
      celebrate({
        [Segments.BODY]: {
          login: Joi.string().required(),
          password: Joi.string().required(),
        },
      }),
      new AuthenticateUserController().handle
    )
  }
}

export const authRoutes = new AuthRoutes()