export default ({ $axios, $auth }) => {
  $axios.onRequest((config) => {
    config.headers.common["X-Requested-With"] = "XMLHttpRequest"
    if ($auth.token) {
      config.headers.common.Authorization = `Bearer ${$auth.token}`
    }
    console.log(config)
  })
  $axios.onResponse((config) => {
    console.log(config)
  })
  $axios.onError((e) => {
    console.log(e.response)
  })
}
