function debounce (func, wait, immediate) {
  let timeout
  return function () {
    let context = this
    let args = arguments
    let later = function () {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      func.apply(context, args)
    }
  }
}
function getURLParams (url) {
  let query = url || window.location.search.substr(1)
  let result = {}
  if (query) {
    query.split('&').forEach(function (part) {
      let item = part.split('=')
      result[item[0]] = decodeURIComponent(item[1])
    })
  }
  return result
}
const getUid = function (len) {
  len = len || 7
  return Math.random().toString(35).substr(2, len)
}
export {debounce, getURLParams, getUid}
