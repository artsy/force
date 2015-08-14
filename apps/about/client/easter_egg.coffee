Konami = require 'konami-js'

module.exports = ->
  init = ->
    $section = $ """
      <div id='about-section7' class='about-container' style='margin-bottom: 2000px' >
        <h1 class='about-section-header' style='margin-bottom: 100px'>
          Carter Cleveland
        </h1>
        <div id='carter-section-container' style='height: 5000px'>
          <div class="about-pull-blurb" style='width: 324px; position: relative; top: 120px'>
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
          <div class='carter-section-scroll-down avant-garde-header-center' style='width: 720px; margin-left: 400px'>
            Scroll Down
            <div class='icon-chevron-down' style='margin-bottom: 7px'></div>
          </div>
          <video id='carter-video' \
            style="position: fixed; top: 0; left: 0; opacity: 0; transition: opacity 0.3s; z-index: -1">
            <source src="#{location.origin}/video/carter.mp4" type='video/mp4' />
          </video>
        </div>
      </div>
    """
    $('.about-foreground').append $section
    video = $('#carter-video')[0]
    $('#carter-section-container .about-pull-blurb').waypoint
      handler: (dir) ->
        if dir is 'down'
          $(this).css position: 'fixed'
          $(video).css opacity: 1
        else
          $(this).css position: 'relative'
          $(video).css opacity: 0
        wide = $(window).width() / $(window).height() > 1.77 # Wider than video aspect ratio
        $(video).css
          width: if wide then '100%' else null
          height: if wide then null else '100%'
    $("html, body").animate { scrollTop: $('#about-section7').offset().top }, 700, ->
      $(window).on 'scroll', ->
        start = $('#carter-section-container').offset().top
        end = start + $('#carter-section-container').height()
        pos = $(window).scrollTop()
        progress = (start - pos) / (start - end)
        video.currentTime = video.duration * progress
  new Konami init
