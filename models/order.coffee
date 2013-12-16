Backbone = require 'backbone'
sd = require('sharify').data

module.exports = class Order extends Backbone.Model

  urlRoot: "#{sd.GRAVITY_URL}/api/v1/me/order/"

  sync: (method, model, options) ->
    # order.fetch will be used to fetch the current user's pending order.
    options.url = "#{@urlRoot}pending" if method is 'read'
    super

  update: (options) ->
    @url = @urlRoot + @id
    @save null,
      success: options.success
      error: options.error

  submit: (options) ->
    @url = @urlRoot + @id + '/submit'
    @save
      success: options.success
      error: options.error

  resume: (options) ->
    @url = @urlRoot + @id + '/resume'
    @save
      success: options.success
      error: options.error
