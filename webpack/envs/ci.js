// @ts-check

import { NODE_ENV } from "../../src/lib/environment"

export const ciConfig = {
  mode: NODE_ENV,
  devtool: false,
}
