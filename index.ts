import http from 'http'

// Config
import { PORT } from './src/config'

// Utils
const { logInfo } = require('./src/utils/logger')

// App
import app from './src/app'

const server = http.createServer(app)

server.listen(PORT, () =>  logInfo(`listening on port ${PORT}`)  )