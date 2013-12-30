module.exports =

  dimensions: (metric = @get('metric')) ->
    @get('dimensions')[metric] if metric
