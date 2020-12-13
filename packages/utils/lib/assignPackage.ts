import projectPackage from '@lo_cli/core/src/template/package.json'

export const assignPackage = (packages) => {
  return Object.assign(projectPackage, packages)
}
