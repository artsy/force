module.getMonthRange = -> [1..12]

module.getYearRange = (range=10) ->
  startDate = new Date()
  startYear = startDate.getFullYear()

  endDate = new Date "01 Jan #{startYear + range}"
  endYear = endDate.getFullYear()

  [startYear..endYear]
