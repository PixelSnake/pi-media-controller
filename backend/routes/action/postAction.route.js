const Joi = require('joi')
const Boom = require('boom')
const Robot = require('robotjs')
const Tools = require('../../tools')

module.exports = {
  method: 'POST',
  path: '/action',
  handler: req => {
    switch (req.payload.type) {
      case 'key':
      {
        const keys = {
          audio_next: 'audio_next',
          audio_pause: 'audio_pause',
          audio_prev: 'audio_prev',
          audio_play: 'audio_play'
        }

        Robot.keyTap(keys[req.payload.action])
        break
      }

      case 'command':
        const tool = Tools[req.payload.action]
        if (!tool) return Boom.notFound(`The command '${ req.payload.action }' is not defined`)

        tool.run(req.payload.payload)
        break
    }

    return ''
  },
  config: {
    description: 'Send an action to the media controller client',
    tags: ['api'],
    validate: {
      payload: {
        type: Joi.string().required().valid('key', 'command'),
        action: Joi.string().required().example(5),
        payload: Joi.any()
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
