module.exports = (model) ->
  message = "Hello, I’m interested in this work"
  message += " by #{model.get('artist').name}" if model.get('artist')
  message += ". Please confirm availability and pricing of this work."
