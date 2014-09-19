_ = require 'underscore'
{ sections } = require './client/data'
module.exports = _.compact _.pluck sections, 'slug'
