if not window? then module.exports = {} else module.exports =
  confirmation: require '../views/confirmation.coffee'

  commercial_interest: require '../views/commercial_interest.coffee'

  basic_info: require '../views/basic_info.coffee'

  artists_in_collection: require '../views/artists_in_collection.coffee'

  galleries_you_work_with: require '../views/galleries_you_work_with.coffee'

  auction_houses_you_work_with: require '../views/auction_houses_you_work_with.coffee'

  institutional_affiliations: require '../views/institutional_affiliations.coffee'

  fairs_you_attend: require '../views/fairs_you_attend.coffee'

  how_can_we_help: require '../views/how_can_we_help.coffee'

  specialist: require '../views/specialist.coffee'

  inquiry: require '../views/inquiry.coffee'

  account: require '../views/account.coffee'

  done: require '../views/done.coffee'
