

export default function() {
  let o = window.location.origin
  let origin = o.match(/(localhost|127.0.0.1)/g) ? 'http://47.104.227.117:8080' : o
  let api = '/shebao/api/transfer'
  const path = {
    getInfo: `${origin}${api}`,
  }
  return path
}
