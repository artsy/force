colors = require '../../components/stylus_lib/colors.json'

@index = (req, res) ->
  res.render 'template',
    colors: colors
