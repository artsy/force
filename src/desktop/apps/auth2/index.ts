import express from 'express'
import { index } from './routes'
// const { twitterLastStepPath } = require('@artsy/passport').options
const app = (module.exports = express())

app.set('view engine', 'jade')
app.set('views', `${__dirname}/templates`)

app.get('/login', index)
app.get('/signup', index)
app.get('/forgot', index)
// app.get(twitterLastStepPath, routes.twitterLastStep)
