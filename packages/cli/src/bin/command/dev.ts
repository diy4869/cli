/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-15 10:31:25
 */
import Service from '@lo_cli/core/src/plugins/service'

export default async function (): Promise<void> {
  // return
  new Service().dev()
}
