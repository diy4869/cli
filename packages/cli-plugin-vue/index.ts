import { API } from '../types'
import config from './config/index'

export default class {
  API: API;
  constructor (API) {
    this.API = API

    this.init()
  }

  init () {
    config.then(res => {
      console.log(res)
    })
  }
}
