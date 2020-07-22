// @ts-check

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const { env } = require("../utils/env")

const smp = new SpeedMeasurePlugin()

export function measureSpeed(config) {
  return env.enableWebpackMeasure ? smp.wrap(config) : config
}
