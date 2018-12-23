/* eslint-disable radix,dot-notation */
export default function ({ $axios, app, redirect }) {
  // Set to all requests
  // $axios.config.headers['Authorization'] = `Bearer ${app.$auth.token}`

  // OR for each request
  // axios.onRequest(() => {
  //   config.headers['Authorization'] = 'Bearer xxx'
  // })
  $axios.onRequest(config => {
    // console.log(app.$auth.token)
    // config.headers['Authorization'] = `Bearer ${app.$auth.token}`
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
