'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')

module.exports = () => {
  co(function* () {
    let keys = Object.keys(config.tpl);
    for (let i in keys) {
      console.log(`${i / 1 + 1}.${keys[i]}`);
    }
    // 处理用户输入
    let tplNameIndex = yield prompt('Template name: ')
    let projectName = yield prompt('Project name: ')
    let gitUrl
    let branch

    if (tplNameIndex-1 > keys.length || tplNameIndex-1 < 0) {
      console.log(chalk.red('\n × Template does not exit!'))
      process.exit()
    }
    gitUrl = config.tpl[keys[tplNameIndex-1]].url
    branch = config.tpl[keys[tplNameIndex-1]].branch

    // git命令，远程拉取项目并自定义项目名
    let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch} && rm -rf .git`

    console.log(chalk.white('\n Start generating...'))

    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }
      console.log(chalk.green('\n √ Generation completed!'))
      console.log(`\n cd ${projectName} && npm install \n`)
      process.exit()
    })
  })
}