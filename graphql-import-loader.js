const { importSchema, parseSDL } = require('graphql-import')
const { dirname, resolve } = require('path')
const { readFileSync } = require('fs')

module.exports = function(source) {
  const callback = this.async()

  this.cacheable()

  let file

  parseSDL(source)
    .map((rawModule) => {
      this.addDependency(resolve(dirname(this.resourcePath), rawModule.from))
    })
    .forEach((rawModule) => {
      this.addDependency(resolve(dirname(this.resourcePath), rawModule.from))
    })

  callback(null, `module.exports = \`${importSchema(this.resourcePath).replace(/`/g, '\\`')}\``)
}

function addDependency(webpack, source, path) {
  const modules = parseSDL(source)

  for (const module of modules) {
    ;;
  }
}
