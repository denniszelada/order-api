import * as bodyParser from 'body-parser'
import * as express from 'express'

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.app.use(bodyParser.json())
  }
}

export default new App().app
