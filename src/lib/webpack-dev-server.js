import express from 'express'
import webpack from 'webpack'
import path from 'path'

const app = (module.exports = express())
const config = require(path.join(process.cwd(), 'webpack.config'))
const compiler = webpack(config)

app.use(
  require('webpack-hot-middleware')(compiler, {
    log: false,
  })
)

app.use(
  require('webpack-dev-middleware')(compiler, {
    quiet: true,
    publicPath: config.output.publicPath,
    serverSideRender: true,
    stats: {
      colors: true,
    },
  })
)

// Testbed for various configurations
app.get('/webpack', (req, res, next) => {
  res.send(`
  <html>
    <head>
      <title>Webpack Test</title>
    </head>
    <body>
      <div id='react-root' />
      <script defer src='/assets/common.js'></script>
      <script defer src='/assets/webpack.js'></script>
    </body>
  </html>
  `)
})
