const path = require('path')
const fs = require('fs')

fs.readdir(path.resolve('assets', 'images'), (err, files) => {
  if (err) {
    console.error(`Failed to list assets: ${err.message}`)
    process.exit(1)
  }
  fs.writeFile(
    path.resolve('dist', 'asset-manifest.json'),
    JSON.stringify(files.map(file => path.join('assets', 'images', file))), err => {
      if (err) {
        console.error(`Failed to write asset manifest: ${err.message}`)
        process.exit(1)
      }
    }
  )
})
