import express from 'express'
import JsonPage from './index'
import routes from './routes'

export default class JSONPage {
  constructor(options) {
    // TODO: Convert this class to TypeScript so you can take advantage of its type system
    if (this.registerRoutes === undefined) {
      throw new TypeError('registerRoutes() must be implemented.')
    }

    this.jsonPage = new JsonPage(options)
    this.routes = routes(this.jsonPage)
    this.app = express()
    this.registerRoutes()
  }

  get data() {
    return this.routes.data
  }

  get edit() {
    return this.routes.edit
  }

  get upload() {
    return this.routes.upload
  }
}
