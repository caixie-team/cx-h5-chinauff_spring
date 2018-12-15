/**
 * @file 本机数据状态 / ES module
 * @module utils/local-storage
 */

export const get = key => localStorage.getItem(key)
export const del = key => localStorage.removeItem(key)
export const set = (key, data) => localStorage.setItem(key, data)

export const localUser = {
  get() {
    const user = get('user')
    return user ? JSON.parse(user) : null
  },
  remove: () => del('user'),
  set: user => set('user', JSON.stringify(user))
}

