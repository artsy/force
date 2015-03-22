$ = window?.$ or null
_ = window?._ or null
imagesLoaded = window?.imagesLoaded or null

jqueryFillwidthLite = (a, b, c) ->
  $ or= a
  _ or= b
  imagesLoaded or= c
  $.fn.fillwidthLite = (options = {}) ->
    fillwidth(
      $(this),
      (options.targetHeight or 500),
      (options.done or ->),
      (options.apply or defaultApply)
      (options.gutterSize or 0)
    )

defaultApply = (img) ->
  img.$el.width(img.width)

fillwidth = ($list, targetHeight, done, apply, gutterSize) ->
  $imgs = $list.find('img')
  imagesLoaded $list[0], =>

    # Map the image DOM els into objects of dimension data for performance.
    imgs = $imgs.map(->
      { width: $(this).width(), height: $(this).height(), $el: $(this) }
    ).toArray()

    # Helpers to do the mathz.
    imgsWidth = ->
      _.reduce _.map(imgs, (i) -> i.width), (m, n) -> m + n
    widthDiff = ->
      Math.abs $list.width() - imgsWidth()
    resizeHeight = (img, dir) ->
      img.width += (img.width / img.height) * dir
      img.height += dir

    # Resize all imgs to a uniform height maintaining aspect ratio
    for img in imgs
      img.width = img.width * (targetHeight / img.height)
      img.height = targetHeight

    # Decide whether we need to make the row of imgs smaller or larger to
    # fit the width of the container
    dir = if imgsWidth() > $list.width() then -1 else 1

    # Resize each img, maintaining aspect ratio, until the row fits the
    # width of the container
    for i in [0..999]
      for img in imgs
        resizeHeight img, dir
        break if widthDiff() < 1
      break if widthDiff() < 1

    # Resize down to accomodate padding
    totalWhitespace = imgs.length * gutterSize
    for i in [0..999]
      for img in imgs
        resizeHeight img, -1
        break if imgsWidth() <= $list.width() - totalWhitespace
      break if imgsWidth() <= $list.width() - totalWhitespace

    # Round off sizes
    for img in imgs
      img.width = Math.floor img.width
      img.height = Math.floor img.height
      break if widthDiff() is 0

    # Apply to DOM
    apply(img, i, gutterSize) for img, i in imgs

    done(imgs)

if module?.exports
  module.exports = jqueryFillwidthLite
else
  window?.jqueryFillwidthLite = jqueryFillwidthLite

