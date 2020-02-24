import { getSplitTest } from "./splitTestContext"

export const skipIfClientSideRoutingEnabled = (_req, _res, next) => {
  if (
    getSplitTest("EXPERIMENTAL_APP_SHELL") ||
    process.env.EXPERIMENTAL_APP_SHELL
  ) {
    return next("route")
  } else {
    return next()
  }
}
