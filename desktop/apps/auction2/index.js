import 'babel-core/register'
import express from 'express'
import reactRenderer from 'express-react-views'
import reloadable, { isDevelopment } from 'desktop/lib/reloadable'

const app = module.exports = express()

app.set('view engine', 'jade')
app.set('views', `${__dirname}/components/server`)
app.engine('jsx', reactRenderer.createEngine({ transformViews: false }))

if (isDevelopment) {
  reloadable(app, (req, res, next) => {
    require('./server')(req, res, next)
  })
} else {
  app.use(require('./server'))
}
