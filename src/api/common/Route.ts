import { Router } from 'express'

export abstract class Route {
  abstract applyRoutes(router: Router): void;
}