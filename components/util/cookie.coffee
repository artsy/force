# A set of helpers for dealing with cookies
# -----------------------------------------
# http://www.quirksmode.org/js/cookies.html

module.exports =

  createCookie: (name, value, days = 7) ->
    if days
      date = new Date()
      date.setTime(date.getTime()+(days*24*60*60*1000))
      expires = "; expires="+date.toGMTString()
    else
      expires = ""
    document.cookie = "#{name}=#{value + expires}; path=/"

  readCookie: (name) ->
    nameEQ = "#{name}="
    ca = document.cookie.split ';'
    for c in ca
      while (c.charAt(0) == ' ')
        c = c.substring 1, c.length
      if (c.indexOf(nameEQ) == 0) then result = c.substring(nameEQ.length, c.length)
    result

  deleteCookie: (name) ->
    @createCookie name, "", -1
