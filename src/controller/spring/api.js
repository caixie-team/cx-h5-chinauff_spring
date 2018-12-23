const Base = require('../base.js');
const path = require('path');
const apiConfig = require(path.join(think.ROOT_PATH, 'client/api.config.js'))
const FormData = require('form-data');
module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  async aiAction () {
    const data = this.post()
    const form = new FormData();
    form.append('file', data.file)
    if (data.file) {
      const res = (await this.got.post(apiConfig.baseUrl + '/ai/image', {
        body: form
      })).body
      return this.json(res)
    }
    return this.success('My ai...')
  }
};
