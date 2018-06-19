import express from 'express'
import { index, resetPassword } from './routes'

const app = (module.exports = express())

app.set('view engine', 'jade')
app.set('views', `${__dirname}/templates`)

app.get('/login', index)
app.get('/signup', index)
app.get('/forgot', index)
// TODO: remove 2 after auth2
app.get('/reset_password2', resetPassword)
