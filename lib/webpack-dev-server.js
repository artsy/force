const express = require('express')
const webpack = require('webpack')
const path = require('path')
const config = require(path.join(process.cwd(), 'webpack.config'))

const app = module.exports = express()
const compiler = webpack(config)

app.use(require('webpack-hot-middleware')(compiler, {
  log: false
}))
app.use(require('webpack-dev-middleware')(compiler, {
  quiet: true,
  // noInfo: true,
  publicPath: config.output.publicPath,
  serverSideRender: true,
  // stats: {
  //   colors: true
  // }
}))

app.get('/webpack', (req, res, next) => {
  res.send(`
  <html>
    <head>
      <title>Webpack Test</title>
    </head>
    <body>
      <div id='react-root' />
      <script src='/public/assets/commons.chunk.js'></script>
      <script src='/public/assets/app.js'></script>
    </body>
  </html>
  `)
})
