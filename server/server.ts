import { config } from '@server/config'
import { DatabaseSchema } from '@server/models'
import {
  register,
  login,
  authenticateJwt,
  getAccount,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createPost,
  deletePost,
  updatePost,
  getPosts,
  getPostById,
  addUser,
  changePassword,
  updateAccountDetails,
} from '@server/route-handlers'
import jsonServer from 'json-server'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

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
server.post('/api/register', register(router))
// Set up a custom route for /login
server.post('/api/login', login(router))

// Protected routes
server.get('/api/account', authenticateJwt, getAccount(router))
server.put(
  '/api/account/settings/changePassword',
  authenticateJwt,
  changePassword(router),
)

server.put(
  '/api/account/settings/changeDetails',
  authenticateJwt,
  updateAccountDetails(router),
)

server.get('/api/users', authenticateJwt, getUsers(router))
server.get('/api/users/:id', authenticateJwt, getUserById(router))
server.post('/api/users', authenticateJwt, addUser(router))
server.put('/api/users/:id', authenticateJwt, updateUserById(router))
server.delete('/api/users/:id', authenticateJwt, deleteUserById(router))

server.get('/api/posts', authenticateJwt, getPosts(router))
server.get('/api/posts/:id', authenticateJwt, getPostById(router))
server.post('/api/posts', authenticateJwt, createPost(router))
server.put('/api/posts/:id', authenticateJwt, updatePost(router))
server.delete('/api/posts/:id', authenticateJwt, deletePost(router))

// Set up middlewares and router
server.use(middlewares)
server.use(router)

// Start server on a specific port
server.listen(config.port, () => {
  console.log(`JSON Server is running at http://localhost:${config.port}`)
})
