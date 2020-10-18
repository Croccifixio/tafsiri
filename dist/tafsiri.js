const chokidar = require('chokidar');

const fs = require('fs');

const path = require('path');

const rimraf = require('rimraf');

const {
  createDirectory
} = require('./_utils');

const {
  getMarkdownFiles,
  parseMarkdownFiles,
  stripFrontMatter,
  saveMarkdownFiles,
  createFilesStruct
} = require('./_markdownProcessor');

const {
  assert
} = require('console');

const cwd = process.cwd();
const CHOKIDAR_OPTIONS = {
  awaitWriteFinish: {
    stabilityThreshold: 100,
    pollInterval: 100
  }
};

class Tafsiri {
  constructor() {
    this.buildMarkdownFiles = () => {
      const markdownFiles = fs.readdirSync(this.assetsDirectory).filter(filename => filename.endsWith('.md'));
      markdownFiles.forEach(file => {
        const filePath = path.join(this.assetsDirectory, file);
        this.processMarkdown(filePath);
      });
    };

    this.initialiseMarkdownFiles = () => {
      rimraf.sync(this.buildDirectory);
      createDirectory(this.buildDirectory);
      this.processMarkdown();
    };

    this.processMarkdown = files => {
      var _ref, _ref2, _ref3, _ref4, _fileNames;

      const fileNames = typeof files === 'string' ? path.basename(files) : fs.readdirSync(this.assetsDirectory);
      /* eslint-disable-next-line no-unused-expressions */

      _ref = (_ref2 = (_ref3 = (_ref4 = (_fileNames = fileNames, getMarkdownFiles(_fileNames)), createFilesStruct(_ref4)), stripFrontMatter(_ref3)), parseMarkdownFiles(_ref2)), saveMarkdownFiles(this.buildDirectory)(_ref);
    };

    this.watchMarkdownFiles = () => {
      const markdownFiles = path.join(this.assetsDirectory, '*.md').replace(/\\/g, '/');
      chokidar.watch(markdownFiles, CHOKIDAR_OPTIONS).on('change', this.processMarkdown);
    };

    this.init = async (assetsDirectory = 'blog', buildDirectory = `${assetsDirectory}/.temp`, watch = false) => {
      this.assetsDirectory = path.join(cwd, assetsDirectory);
      this.buildDirectory = path.join(cwd, buildDirectory);
      if (watch) this.watchMarkdownFiles();else this.buildMarkdownFiles();
    };
  }

}

module.exports = new Tafsiri();