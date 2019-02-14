// @ts-check

import { NODE_ENV } from "../../src/lib/environment"
import { plugins } from "./debug"

export const ciConfig = {
  mode: NODE_ENV,
  devtool: false,
  plugins: [plugins.duplicates],
}
