Backbone = require('../../novo/src/Backbone.Events')
mediator = Backbone
module.exports = (window?.__mediator ?= mediator) or mediator
