_ = require 'underscore'

module.exports =

  # 'name' refers to the name from the address form
  # user.name is the name associated with the user.
  formatMessage: ({ artwork, user, name, street1, street2, city, state, zip, country, message })->
    titleAndDate = _.compact([
      '"' + artwork.title + '"',
      '(' + artwork.date + ')' if artwork.date,
    ]).join ' '

    p1 = user.name + ' submitted a request to purchase ' + titleAndDate + ' by ' + artwork.artist_names + '.'

    p2 = "Please confirm the work's availability and details, and provide \
      a shipping estimate to the below address. We ask you to reply within 3 business \
      days, and collectors to confirm purchase within 72 hours after receiving a quote. \
      Please note that the collector will review your quote before agreeing to purchase \
      the work and notify you of the final decision."

    cityStateZip = "#{city}, #{state} #{zip}"

    address = _.compact([
      name,
      street1,
      street2,
      cityStateZip,
      country
    ]).join '\n'

    message = """


    Message from #{user.name}:

    #{message}
    """ if message

    """
    #{p1}

    #{p2}

    #{address}
    #{message}
    """
