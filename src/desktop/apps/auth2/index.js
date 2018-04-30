import express from 'express'
import { index } from './routes.js'
// const { twitterLastStepPath } = require('@artsy/passport').options

const app = (module.exports = express())

app.set('view engine', 'jade')
app.set('views', `${__dirname}/templates`)

app.get('/login', index)
app.get('/signup', index)
// app.get('/reset_password', routes.resetPassword)
// app.get(twitterLastStepPath, routes.twitterLastStep)
