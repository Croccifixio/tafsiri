const fs = require('fs');

const md = require('marked');

const path = require('path');

const {
  createFile
} = require('./_utils');

const renderer = require('./_markdownRules');

const getMarkdownFiles = fileNames => {
  if (typeof fileNames === 'string') fileNames = [fileNames];
  return fileNames.filter(fileName => fileName.endsWith('.md'));
};

const parseMarkdownFiles = filesStruct => filesStruct.map(fileStruct => {
  const {
    markdown
  } = fileStruct;
  return { ...fileStruct,
    parsedMarkdown: md(markdown, {
      renderer
    })
  };
});

const stripFrontMatter = filesStruct => filesStruct.map(fileStruct => {
  const {
    fileContent
  } = fileStruct;
  const [, frontMatter, markdown] = fileContent.match(/(^(?:---|\+\+\+)\r?\n.+?(?:---|\+\+\+)\r?\n)(.*)/s);
  return { ...fileStruct,
    frontMatter,
    markdown
  };
});

const saveMarkdownFiles = filesStruct => {
  filesStruct.forEach(({
    fileName,
    frontMatter,
    parsedMarkdown
  }) => {
    const buildPath = path.resolve('blog/.temp');
    const filePath = path.join(buildPath, fileName);
    if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath);
    createFile(filePath, `${frontMatter}\n${parsedMarkdown}`);
  });
};

const createFilesStruct = fileNames => fileNames.map(fileName => {
  const filePath = path.join('blog', fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return {
    fileName,
    fileContent
  };
});

module.exports = {
  getMarkdownFiles,
  parseMarkdownFiles,
  stripFrontMatter,
  saveMarkdownFiles,
  createFilesStruct
};