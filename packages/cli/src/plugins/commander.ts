/*
 * @Author: last order
 * @Date: 2020-06-19 17:52:51
 * @LastEditTime: 2020-07-22 13:38:32
 */
import { Command } from 'commander'
import commander = require('commander')

const program = new Command()

interface CommandInterface {
  [propName: string]: CommandOptions
}

interface Options {
  [propName: string]: string
}

interface CommandOptions {
  desc?: string,
  option?: Options,
  action(args: () => void): void
}

const registerCommander = (options: CommandInterface): commander.Command => {
  const { option } = options
  program
    .command(options.command)
    .description(options.desc)
    .option(option)
    .action.call(options.action)

  program.parse(process.argv)

  return program
}

export default registerCommander
