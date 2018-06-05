const Hapi = require('Hapi')
const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const routes = require('./routes')
const database = require('./database')

const server = Hapi.server({
  host: '0.0.0.0',
  port: 4201,
  routes: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['x-session-token']
    }
  }
})

routes.register(server)

const plugins = [
  {
    name: 'database',
    register: database.register
  },
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: {
      host: 'localhost:4201',
      info: {
        title: 'Pi Media Controller - API documentation'
      }
    }
  }
]

async function start() {
  console.log('Starting server...')

  try {
    await server.register(plugins)
    await server.start()
  }
  catch (err) {
    console.log(err)
    process.exit(1)
  }

  console.log(`Server running at ${server.info.uri}`)
}

start()
