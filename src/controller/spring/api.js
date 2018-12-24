const fs = require('fs')
const Base = require('../base.js');
const path = require('path');
const apiConfig = require(path.join(think.ROOT_PATH, 'client/api.config.js'))
const FormData = require('form-data');
const axios = require('axios')
module.exports = class extends Base {
  indexAction () {
    return this.display();
  }

  async aiAction () {
    const data = this.post()
    const form = new FormData()
    form.append('file', data.file)
    if (data.file) {
      const res = (await this.got.post(apiConfig.baseUrl + '/ai/image', {
        body: form
      })).body
      return this.json(res)
    }
    return this.success('My ai...')
  }

  /**
   * 福字相关 api
   * @returns {Promise<*>}
   */
  async blessingAction () {
    const data = this.post()
    const form = new FormData()
    form.append('blessing_code', data.blessing_code)
    if (data.blessing_code) {
      const res = (await this.got.post(apiConfig.baseUrl + '/blessing/getOne', {
        body: form
      })).body
      return this.json(res)
    }
  }
}
