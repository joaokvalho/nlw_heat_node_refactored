import "dotenv/config"
import express, { Application } from "express"
import cors from 'cors'

import { config } from './core/config/environment'
import { Route } from "./api/common/Route"
import { AppGlobalError } from "./api/middlewares/AppGlobalError"

export class App {
  private application: Application

  constructor() {
    this.application = express()
  }

  public async bootstrap(routes: Route[]): Promise<void> {
    this.application.use(cors())
    this.application.use(express.json())

    this.application.get('/', (request, response) => {
      return response.status(200).json({
        service: 'NLW Heat Node 2021',
        version: '1',
        resources: [
          `POST: ${config.SERVER.BASE_URL}/auth/github`,
          `POST: ${config.SERVER.BASE_URL}/auth/signin`,
          `POST: ${config.SERVER.BASE_URL}/auth/signup`,
          `GET: ${config.SERVER.BASE_URL}/users/profile`,
          `POST: ${config.SERVER.BASE_URL}/messages`,
          `GET: ${config.SERVER.BASE_URL}/messages/last3`
        ]
      })
    })

    this.application.get("/github", (request, response) => {
      response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
      )
    })
    this.application.get("/signin/callback", (request, response) => {
      const { code } = request.query
      return response.json(code)
    })

    // Apply routes
    for (let route of routes) {
      route.applyRoutes(this.application)
    }

    // // Get errors validation routes (celebrate)
    // this.application.use(errors())

    // Get global errors api
    this.application.use(AppGlobalError)
  }

  public routes(routes: Route[] = []): express.Application {
    this.bootstrap(routes)
    return this.application
  }

}