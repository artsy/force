module.exports =
  layoutStyle: (collectionLength) ->
    switch collectionLength
      when 1 then 'full'
      when 2 then 'half'
      when 3 then 'third'
      else 'quarter'

  imageSizeForLayout: (collectionLength) ->
    switch collectionLength
      when 1 then 'original'
      when 2, 3 then 'large_rectangle'
      else 'medium_rectangle'
