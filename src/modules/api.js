import { API_HOST } from 'config'

class API {
  constructor ({url}) {
    this.url = url || API_HOST
  }
  get (params = {}) {
    return call(this.url, 'GET', params)
  }
  post (params = {}) {
    return call(this.url, 'POST', params)
  }
  put (params = {}) {
    return call(this.url, 'PUT', params)
  }
  delete () {
    return call(this.url, 'DELETE')
  }
}

function call (api, method, params) {
  var result = ''
  if (params) {
    for (let key in params) {
      if (params[key]) {
        result += (result.length ? '&' : '') + key + '=' + params[key]
      }
    }
  }

  let options = {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }
  if (method !== 'GET' && method !== 'DELETE') {
    options.body = result
  } else if (method === 'GET') {
    api = api + '?' + result
  }
  if (method === 'POST') {
    let formData = new FormData()
    Object.keys(params).map(function (key) {
      formData.append(key, params[key])
    })
    options.body = formData
    delete options.headers
  }
  return window.fetch(api, options).then(function (response) {
    let result = {}
    result.status = response.status
    if (String(response.status).indexOf('2') === 0) {
      result.success = true
    } else if (String(response.status).indexOf('4') === 0) {
      result.success = false
    } else if (String(response.status).indexOf('5') === 0) {
      throw new ResponseStatusError('Error status from api', response.status)
    }
    return response.json().then(function (body) {
      if (body) {
        result.message = body.message
        result.data = body.data
      }
      return (Promise.resolve(body))
    })
  }).catch(function (error) {
    //  handle the error here or throw
    console.log(error.message)
    throw error
  })
}

export default API
