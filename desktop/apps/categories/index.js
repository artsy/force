import '@babel/register'
import express from 'express'
import * as routes from './routes'

const app = module.exports = express()

app.set('view engine', 'jade')
app.set('views', `${__dirname}/components`)

app.get('/categories', routes.index)
