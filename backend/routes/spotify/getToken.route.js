const Joi = require('joi')
const Boom = require('boom')
const http = require('superagent')
const environment = require('../../environment/environment')

module.exports = {
  method: 'GET',
  path: '/spotify/token',
  handler: req => {
    return http
      .post(`https://accounts.spotify.com/api/token`)
      .send({
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: environment.spotify.redirectUri,
        client_id: environment.spotify.clientId,
        client_secret: environment.spotify.clientSecret
      })
      .type('form')
      .then(res => res.body)
      .catch(err => Boom.unauthorized())
  },
  config: {
    description: 'Fetch API Token from Spotify given the callback code',
    tags: ['api'],
    validate: {
      query: {
        code: Joi.string().required()
      }
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: { description: 'OK' },
          400: { description: 'Bad Request / Validation Error' },
          404: { description: 'Not Found' }
        }
      }
    }
  }
}
