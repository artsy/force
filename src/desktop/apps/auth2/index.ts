import express from 'express'
import { data as sd } from 'sharify'
import { index } from './routes'
// const { twitterLastStepPath } = require('@artsy/passport').options
const app = (module.exports = express())

app.set('view engine', 'jade')
app.set('views', `${__dirname}/templates`)

app.get('/login', index)
app.get('/signup', index)
// TODO: Remove if statement after /auth2 launches
if (sd.NEW_AUTH_MODAL) {
  app.get('/forgot', index)
}
// app.get(twitterLastStepPath, routes.twitterLastStep)
