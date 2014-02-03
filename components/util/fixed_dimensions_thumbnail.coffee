module.exports = ($images) ->

  $images.each (count, image) ->
    $image = $(image)
    imageWidth = $image.width()
    imageHeight = $image.height()
    parentWidth = $image.parent().width()
    parentHeight = $image.parent().height()
    if (imageWidth / imageHeight) > (parentWidth/parentHeight)
      left = ( parentWidth - ( parentHeight * imageWidth / imageHeight ) ) / 2
      $image.css( { left: "#{left}px", height: '100%' } )
     else
      top = ( parentHeight - ( parentWidth * imageHeight / imageWidth ) ) / 2
      $image.css( { top: "#{top}px", width: '100%' } )
    $image.show()
