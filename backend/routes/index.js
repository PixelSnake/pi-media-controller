const actionRoutes = require('./action')

module.exports.register = server => {
  const routes = [
    ...actionRoutes
  ]

  routes.forEach(r => server.route(r))
}
