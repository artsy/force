module.exports =
  layoutStyle: (collectionLength) ->
    switch collectionLength
      when 1 then 'full'
      when 2 then 'half'
      when 3 then 'third'
      when 4 then 'quarter'
      when 5 then 'fifth'
      when 6 then 'sixth'
      else 'quarter'

  imageSizeForLayout: (collectionLength) ->
    switch collectionLength
      when 1 then 'wide'
      when 2, 3 then 'large_rectangle'
      else 'medium_rectangle'
