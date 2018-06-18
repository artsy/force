import express from 'express'
import { index } from './routes'
const app = (module.exports = express())

app.set('view engine', 'jade')
app.set('views', `${__dirname}/templates`)

app.get('/login', index)
app.get('/signup', index)
app.get('/forgot', index)
