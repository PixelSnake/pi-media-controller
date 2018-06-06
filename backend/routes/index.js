module.exports.register = server => {
  const routes = [
    ...require('./action'),
    ...require('./spotify')
  ]

  routes.forEach(r => server.route(r))
}
