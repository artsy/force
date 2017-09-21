const express = require('express')
const webpack = require('webpack')
const path = require('path')
const config = require(path.join(process.cwd(), 'webpack.config'))

const app = module.exports = express()
const compiler = webpack(config)

app.use(require('webpack-hot-middleware')(compiler))
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  serverSideRender: true,
  stats: {
    colors: true
  }
}))

app.get('/', (req, res, next) => {
  res.send(`
  <html>
    <head>
      <title>Webpack Test</title>
    </head>
    <body>
      <div id='react-root' />
      <script src='/public/assets/app.js'></script>
    </body>
  </html>
  `)
})

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000.')
})
