const fs = require('fs')
const path = require('path')

/**
 * Creates a directory if it does not exist
 *
 * @param {string} dir
 */
const createDirectory = (dir) => {
  const dirPath = path.resolve(dir)
  if (fs.existsSync(dirPath)) return

  fs.mkdirSync(dirPath)
}

/**
 * Creates a file if it does not exist or overwrites it if its contents have changed
 *
 * @param {string} filePath
 * @param {string} fileContent
 */
const createFile = (filePath, fileContent) => {
  if (fs.existsSync(filePath)) {
    const existingFileContents = fs.readFileSync(filePath).toString()
    if (existingFileContents === fileContent) return
  }

  fs.writeFileSync(filePath, fileContent, { flag: 'w' }, (err) => {
    if (err) throw err
  })
}

module.exports = {
  createDirectory,
  createFile,
}
