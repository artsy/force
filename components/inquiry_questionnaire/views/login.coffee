StepView = require './step.coffee'
template = -> require('../templates/login.jade') arguments...

module.exports = class Login extends StepView
  template: template
