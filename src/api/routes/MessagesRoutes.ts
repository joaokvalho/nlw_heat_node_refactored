import { Router } from "express"

import { celebrate, Segments, Joi } from 'celebrate'

import { Route } from "../common/Route"
import { EnsureAuthenticated } from "../middlewares/EnsureAuthenticated"
import { CreateMessageController } from "../controllers/CreateMessageController"
import { GetLast3MessagesController } from "../controllers/GetLast3MessagesController"

class MessagesRoutes extends Route {

  public applyRoutes(router: Router): void {
    router.post(
      '/messages',
      celebrate({
        [Segments.BODY]: {
          message: Joi.string().required(),
        },
      }),
      EnsureAuthenticated,
      new CreateMessageController().handle
    )

    router.get(
      '/messages/last3',
      new GetLast3MessagesController().handle
    )
  }

}

export const messagesRoutes = new MessagesRoutes()