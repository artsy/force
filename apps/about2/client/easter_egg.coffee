Konami = require 'konami-js'

module.exports = ->
  $section = $ """
    <div id='about2-section7' class='about2-container' style='margin-bottom: 2000px' >
      <h1 class='about2-section-header' style='margin-bottom: 100px'>
        Carter Cleveland
      </h1>
      <div id='carter-section-container' style='height: 5000px'>
        <div class="about2-pull-blurb" style='width: 324px; position: relative; top: 120px'>
          <h2>The legend himself</h2>
          <p>Carter Cleveland, a computer science major with art-loving parents, \
             scoured the Internet for something beautiful to hang on his wall at \
             Princeton University, but came up empty. He resolved to build a one-stop \
             art shop himself.
             <br>
             [...]
             <br>
             "In the art world, people are afraid to say they don't get it," he said. \
             "What's up with that? Why should there be fear associated with this form \
             of human expression?"
             <br>
             <br>
             <a href='http://mycrains.crainsnewyork.com/40under40/profiles/2014/carter-cleveland'>
              <em>Source</em></a>
          </p>
        </div>
        <video id='carter-video' \
          style="position: fixed; top: 0; left: 0; opacity: 0; transition: opacity 0.3s; z-index: -1">
          <source src="#{location.origin}/video/carter.mp4" type='video/mp4' />
        </video>
      </div>
    </div>
  """
  init = ->
    $('.about-2-foreground').append $section
    video = $('#carter-video')[0]
    $('#carter-section-container .about2-pull-blurb').waypoint
      handler: (dir) ->
        wide = $(window).width() > $(window).height()
        if dir is 'down'
          $(this).css position: 'fixed'
          $(video).css
            opacity: 1
            width: if wide then null else '100%'
            height: if wide then '100%' else null
        else
          $(this).css position: 'relative'
          $(video).css opacity: 0
      offset: 120
    $("html, body").animate { scrollTop: $('#about2-section7').offset().top }, 700, ->
      $(window).on 'scroll', ->
        start = $('#carter-section-container').offset().top
        end = start + $('#carter-section-container').height()
        pos = $(window).scrollTop()
        progress = (start - pos) / (start - end)
        video.currentTime = video.duration * progress
  new Konami init