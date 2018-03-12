module.exports =
  buildBodyClass: (sd, baseClass) ->
    classes = []
    classes.push baseClass if baseClass

    flagMap =
      # Flags that show up in Sharify data
      MICROSITE: 'is-microsite'
      EIGEN: 'body-eigen'
      IS_RESPONSIVE: 'body-responsive'

    for flag, klass of flagMap
      classes.push klass if sd[flag]

    classes.join ' '
