const chokidar = require('chokidar')
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const { createDirectory } = require('./_utils')
const {
  getMarkdownFiles,
  parseMarkdownFiles,
  stripFrontMatter,
  saveMarkdownFiles,
  createFilesStruct,
} = require('./_markdownProcessor')
const { assert } = require('console')
const cwd = process.cwd()

const CHOKIDAR_OPTIONS = {
  awaitWriteFinish: {
    stabilityThreshold: 100,
    pollInterval: 100,
  },
}

class Tafsiri {
  buildMarkdownFiles = () => {
    const markdownFiles = fs
      .readdirSync(this.assetsDirectory)
      .filter((filename) => filename.endsWith('.md'))

    markdownFiles.forEach((file) => {
      const filePath = path.join(this.assetsDirectory, file)
      this.processMarkdown(filePath)
    })
  }

  initialiseMarkdownFiles = () => {
    rimraf.sync(this.buildDirectory)
    createDirectory(this.buildDirectory)

    this.processMarkdown()
  }

  processMarkdown = (files) => {
    const fileNames = typeof files === 'string'
      ? path.basename(files)
      : fs.readdirSync(this.assetsDirectory)

    /* eslint-disable-next-line no-unused-expressions */
    fileNames
    |> getMarkdownFiles
    |> createFilesStruct
    |> stripFrontMatter
    |> parseMarkdownFiles
    |> saveMarkdownFiles(this.buildDirectory)
  }

  watchMarkdownFiles = () => {
    const markdownFiles = path.join(this.assetsDirectory, '*.md').replace(/\\/g, '/')

    chokidar
      .watch(markdownFiles, CHOKIDAR_OPTIONS)
      .on('change', this.processMarkdown)
  }

  init = (assetsDirectory = 'blog') => (buildDirectory = `${assetsDirectory}/.temp`) => (watch = false) => {
    this.assetsDirectory = path.join(cwd, assetsDirectory)
    this.buildDirectory = path.join(cwd, buildDirectory)

    if (watch) this.watchMarkdownFiles()
    else this.buildMarkdownFiles()
  }
}

module.exports = new Tafsiri
