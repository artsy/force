import express from "express"

export const app = express()

/**
 * Blank page used by Eigen for caching web views.
 * See: https://github.com/artsy/microgravity-private/pull/1138
 * TODO: Does this need to come before middleware?
 */
app.use(require("../../desktop/apps/blank"))
