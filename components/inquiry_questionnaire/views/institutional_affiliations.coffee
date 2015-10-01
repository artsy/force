StepView = require './step.coffee'
Form = require '../../form/index.coffee'
template = -> require('../templates/institutional_affiliations.jade') arguments...

module.exports = class InstitutionalAffiliations extends StepView
  template: -> template arguments...

  __events__:
    'click button': 'serialize'

  serialize: (e) ->
    e.preventDefault()

    form = new Form model: @user, $form: @$('form')
    return unless form.isReady()

    form.state 'loading'

    @user.related().collectorProfile
      .save form.data(),
        success: => @next()
        error: form.error.bind form
