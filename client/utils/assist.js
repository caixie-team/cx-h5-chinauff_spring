import Vue from 'vue';

const isServer = Vue.prototype.$isServer;

// 判断参数是否是其中之一
export const oneOf = function (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

export const camelcaseToHyphen = function(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

