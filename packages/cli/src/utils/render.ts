import ejs = require('ejs')
import fs = require('fs')

export default <T>(path: string, options: T): string => {
  const file = fs.readFileSync(path, {
    encoding: 'utf-8'
  })
  const result = ejs.render(file, options)

  console.log(result)
  return result
}
