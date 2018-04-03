import express from 'express'
import { index } from './routes.js'
import adminOnly from '../../lib/admin_only'

export const app = express()

app.set('views', __dirname)
app.set('view engine', 'jade')

app.get('/experimental', adminOnly, index)
