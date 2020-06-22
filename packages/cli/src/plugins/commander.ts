/*
 * @Author: last order
 * @Date: 2020-06-19 17:52:51
 * @LastEditTime: 2020-06-22 15:27:51
 */
import { Command } from 'commander'
import commander = require('commander')

const program = new Command()

interface CommandInterface {
  command: string,
  desc?: string,
  action(args: () => void): void
}

const registerCommander = (options: CommandInterface): commander.Command => {
  program
    .command(options.command)
    .description(options.desc)
    .action.call(options.action)

  program.parse(process.argv)

  return program
}

export default registerCommander
