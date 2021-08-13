// @ts-check

import MomentTimezoneDataPlugin from "moment-timezone-data-webpack-plugin"
const currentYear = new Date().getFullYear()

export const clientPlugins = [
  // To include only specific zones, use the matchZones option
  new MomentTimezoneDataPlugin({
    matchZones: /^America\/New_York/,
  }),

  // To keep all zones but limit data to specific years, use the year range options
  new MomentTimezoneDataPlugin({
    startYear: currentYear - 5,
    endYear: currentYear + 5,
  }),
]
