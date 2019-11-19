#!/usr/bin/env node

const yargs = require('yargs');

const tafsiri = require('./tafsiri');

const {
  d: assetsDirectory,
  b: buildDirectory,
  w: watch
} = yargs.usage('Usage: tafsiri -d <src-directory> [-b <build-directory>]').demandOption(['d']).help('h').alias('h', 'help').alias('w', 'watch').alias('d', 'src-directory').alias('b', 'build-directory').argv;

function main() {
  if (assetsDirectory) {
    tafsiri.init(assetsDirectory, buildDirectory, watch);
  } else {
    yargs.showHelp();
  }
}

main();