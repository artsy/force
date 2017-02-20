import * as routes from './routes'
import express from 'express'
import path from 'path'

const app = express()
app.set('views', path.resolve(__dirname, 'templates'))
app.set('view engine', 'jade')

app.get('/artsy-primer/:id', routes.article)

export default app
