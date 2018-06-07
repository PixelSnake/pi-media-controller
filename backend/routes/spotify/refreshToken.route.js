const Joi = require('joi')
const Boom = require('boom')
const http = require('superagent')
const environment = require('../../environment/environment')

module.exports = {
  method: 'GET',
  path: '/spotify/token/refresh',
  handler: req => {
    return http
      .post(`https://accounts.spotify.com/api/token`)
      .send({
        grant_type: 'refresh_token',
        refresh_token: req.query.refresh_token
      })
      .set('Authorization', `Basic ${ Buffer(`${ environment.spotify.clientId }:${ environment.spotify.clientSecret }`).toString('base64') }`)
      .type('form')
      .then(res => res.body)
      .catch(err => Boom.unauthorized())
  },
  config: {
    description: 'Refresh API Token from Spotify given the refresh token',
    tags: ['api'],
    validate: {
      query: {
        refresh_token: Joi.string().required()
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
