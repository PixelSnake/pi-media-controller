const { spawn } = require('child_process')

module.exports.run = device => {
  spawn(`${__dirname}/EndPointController.exe`, [device])
}
