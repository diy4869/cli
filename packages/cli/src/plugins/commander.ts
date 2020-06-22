/*
 * @Author: last order
 * @Date: 2020-06-19 17:52:51
 * @LastEditTime: 2020-06-22 11:15:34
 */
import { Command } from 'commander'
import commander = require('commander')

const program = new Command()

interface CommandInterface {
  command: string,
  desc?: string,
  action(...args): void
}

const registerCommander = (options: CommandInterface): commander.Command => {
  program
    .command(options.command)
    .description(options.desc)
    .action((...args) => {
      options.action(...args)
    })

  program.parse(process.argv)

  return program
}

export default registerCommander
