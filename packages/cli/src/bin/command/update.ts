/*
 * @Author: last order
 * @Date: 2020-12-22 15:21:24
 * @LastEditTime: 2020-12-22 18:11:09
 */
import { exec } from 'child_process'
import packageJSON from 'package-json'
import semver = require('semver')
import path = require('path')
import fs = require('fs')

const baseDir = process.cwd()

interface packageInfo {
  name: string,
  stableVersion: string,
  latest: string,
  version?: string,
}

export async function getPackageInfo (packageName: string): Promise<packageInfo> {
  const result = await packageJSON(packageName, {
    fullMetadata: true,
    allVersions: true
  })

  return {
    name: result.name,
    stableVersion: result['dist-tags'].latest,
    latest: result['dist-tags'].next
  }
}

async function updatePackageList () {
  const { devDependencies, dependencies } = JSON.parse(fs.readFileSync(
    path.resolve(baseDir, 'package.json'),
    {
      encoding: 'utf-8'
    }
  ))
  const dependenciesList = Object.assign(devDependencies, dependencies)
  const result = Object.keys(dependenciesList)
  const list = []

  for (const current of result) {
    const packageInfo = await getPackageInfo(current)
    const dep = result.find(item => item === current)

    packageInfo.version = dependenciesList[dep]

    if (packageInfo.latest) {
      list.push(packageInfo)
    }
  }
  // 待处理
  const updateList = list.filter(item => {
    return semver.gt(item.version, item.stableVersion)
  })

  console.log(updateList)
}

export async function install (): Promise<void> {
  updatePackageList()
  // const result = await getPackageInfo('@types/node')
  // console.log(result)
}
// install()
