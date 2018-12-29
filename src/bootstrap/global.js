const crypto = require('crypto');

/**
 * 加密
 * @param text 明文
 * @param key 密钥:必须8位
 * @returns {*}
 */
global.encrypt = function (text, key) {
  // let cipher = crypto.createCipheriv("des-ecb", new Buffer(key), new Buffer(0));
  let cipher = crypto.createCipheriv("aes-128-cbc", new Buffer(key), new Buffer(16));
  // let encrypt = cipher.update(text, 'utf8', 'base64');
  let encrypt = cipher.update(text, 'utf8', 'hex');
  // encrypt += cipher.final('base64');
  encrypt += cipher.final('hex');
  return encrypt;
}

/**
 * 解密
 * @param text 明文
 * @param key 密钥:必须8位
 * @returns {*}
 */
global.decrypt = function (encrypt, key) {
  // let decipher = crypto.createDecipheriv("des-ecb", new Buffer(key), new Buffer(0));
  let decipher = crypto.createDecipheriv("aes-128-cbc", new Buffer(key), new Buffer(16));
  try {
    // let text = decipher.update(encrypt, 'base64', 'utf8');
    let text = decipher.update(encrypt, 'hex', 'utf8');
    text += decipher.final('utf8');
    return text;
  } catch (e) {
    return null;
  }
}
