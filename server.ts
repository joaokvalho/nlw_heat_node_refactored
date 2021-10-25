import Http from 'http'
import { Server } from 'socket.io'

import { App } from './src/app'
import { config } from './src/core/config/environment'
import { messagesRoutes } from './src/api/routes/messages.routes'
import { authRoutes } from './src/api/routes/auth.routes'
import { usersRoutes } from './src/api/routes/users.routes'

const appInstance = new App().routes([
  usersRoutes,
  authRoutes,
  messagesRoutes
])

const httpServer = Http.createServer(appInstance)
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})
io.on("connection", socket => {
  console.log(`User connected on socket ${socket.id}`)
})

httpServer.listen(config.SERVER.PORT, () => {
  console.log(`Server listening on ${config.SERVER.BASE_URL}`);
})

export { io }