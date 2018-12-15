const csrfToken = function() {
  // return document.getElementById('csrf-token-meta-tag').content
  const meta = document.querySelector('meta[name=csrf-token]')
  return meta && meta.content
}

const csrfParam = function () {
  const meta = document.querySelector('meta[name=csrf-param]')
  return meta && meta.content
}

const CSRFProtection = function (xhr) {
  const token = csrfToken()
  if (token) xhr.setRequestHeader('X-CSRF-Token', token)
}
