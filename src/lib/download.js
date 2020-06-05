/*
 * @Author: last order
 * @Date: 2020-06-04 19:12:10
 * @LastEditTime: 2020-06-04 19:20:59
 */
const download = require('download-git-repo')

module.exports = (url, path) => {
  return new Promise((resolve, reject) => {
    download(url, path, {}, err => {
      err ? reject(err) : resolve()
    })
  })
}
