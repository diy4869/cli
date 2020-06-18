/*
 * @Author: last order
 * @Date: 2020-06-02 14:01:46
 * @LastEditTime: 2020-06-16 16:35:37
 */
import { copy } from '../utils'

copy('./test', '../../src/test')

// fsExtra.copySync('./test', '../../src')
// const fsPromise = fs.promises

// fsPromise.readFile('../lib/index.js', {
//   encoding: 'utf-8'
// }).then(res => {
//   console.log(res)
// })
