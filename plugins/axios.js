export default ({ $axios }) => {
  $axios.onRequest((config) => {
    config.headers.common["X-Requested-With"] = "XMLHttpRequest"
    console.log(config)
  })
  $axios.onResponse((config) => {
    console.log(config)
  })
  $axios.onError((e) => {
    console.log(e.response)
  })
}
