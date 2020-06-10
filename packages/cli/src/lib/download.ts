/*
 * @Author: last order
 * @Date: 2020-06-04 19:12:10
 * @LastEditTime: 2020-06-10 14:33:22
 */
import download from 'download-git-repo'

const Download = (url: string, path: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    download(url, path, {}, err => {
      err ? reject(err) : resolve()
    })
  })
}

export default Download
