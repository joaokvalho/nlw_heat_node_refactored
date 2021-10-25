import { Request, Response, NextFunction } from "express"

import { AppError, AppErrorType } from '../../core/exception/AppError'

export function AppGlobalError(
  err: Error, request: Request, response: Response, next: NextFunction) {

  if (err instanceof AppError) {
    return response.status(err.status).json({
      type: err.type,
      userMessage: err.userMessage,
      timestemp: err.timestamp,
    })
  }

  return response.status(500).json({
    type: AppErrorType.MESSAGE_NOT_READABLE,
    userMessage: AppErrorType.ERROR_MESSAGE_ALL_EXCEPTION,
    detail: err.message,
    timestemp: new Date()
  })

}
