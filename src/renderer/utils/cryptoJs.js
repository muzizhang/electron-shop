const CryptoJS = require('crypto-js')

export function getSHA1(data) {
  return CryptoJS.SHA1(data).toString()
}
