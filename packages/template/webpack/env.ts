/*
 * @Author: last order
 * @Date: 2020-06-09 11:02:24
 * @LastEditTime: 2020-06-09 11:06:34
 */
export type ENV_TYPE = 'development' | 'production'

const ENV = process.env.NODE_ENV

export default ENV as ENV_TYPE
