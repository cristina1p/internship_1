import { config } from '@server/config'
import { DatabaseSchema } from '@server/models'
import jsonServer from 'json-server'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import {
  register,
  login,
  authenticateJwt,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from './route-handlers'

// Get the directory name of the current module file (for db.json path)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Create a new jsonServer instance
const server = jsonServer.create()

// Middleware to parse JSON bodies
server.use(jsonServer.bodyParser)

// Assuming `router.db` is a Lowdb instance with a JSON backend
const router = jsonServer.router<DatabaseSchema>(`${__dirname}${config.dbPath}`)
// Use default middlewares (for CORS, logging, etc.)
const middlewares = jsonServer.defaults()

// Register a custom POST /register endpoint
server.post('/register', register(router))
// Set up a custom route for /login
server.post('/login', login(router))

// Protected routes
server.get('/users', authenticateJwt, getUsers(router))
server.get('/users/:id', authenticateJwt, getUserById(router))
server.put('/users/:id', authenticateJwt, updateUserById(router))
server.delete('/users/:id', authenticateJwt, deleteUserById(router))

// Set up middlewares and router
server.use(middlewares)
server.use(router)

// Start server on a specific port
server.listen(config.port, () => {
  console.log(`JSON Server is running at http://localhost:${config.port}`)
})
