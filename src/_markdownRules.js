/* eslint-disable */
const md = require('marked');
const Prism = require('prismjs')
const loadLanguages = require('prismjs/components/')

// load all languages
loadLanguages()

// matches string wrapped with double underscores
const emphasiseCode = [/(__)(.+?)(__)/g, '<span class="code-emphasis">&lt;$2&gt;</span>']

// matches any non-empty string prefixed by two dollar signs and suffixed by a space
const handlePrompt = [/\${2}(\S{1,}\s)/g, '<span class="code-prompt">$1</span>']

// matches any non-empty string wrapped by quadruple carets
const handleOuterNestedKeyboardInput = [/\^{4}(.+?)\^{4}/g, '<kbd>^^$1^^</kbd>']

// matches any non-empty string wrapped by douuble carets
const handleKeyboardInput = [/\^{2}(.+?)\^{2}/g, '<kbd class="key">$1</kbd>']

// matches a plus sorrounded by spaces in between kbd nodes
const handleInnerNestedKeyboardInput = [/(<\/kbd>)\s\+\s(<kbd)/g, '$1&nbsp;+&nbsp;$2']

// matches list items with an h2 node as its first child
const handleListItemWithHeading = [/<li><h2>/g, '<li class="numbered-heading"><h2><span></span>']

const preformatCode = (code) => code
  .replace(...emphasiseCode)
  .replace(...handlePrompt)

const preformatParagraph = (text) => text
  .replace(...handleOuterNestedKeyboardInput)
  .replace(...handleKeyboardInput)
  .replace(...handleInnerNestedKeyboardInput)

const preformatListItem = (text) => text
  .replace(...handleListItemWithHeading)

const renderer = new md.Renderer();

renderer.code = (code, language) => {
  if (!language) {
    return `<div class="pre">\n\n<pre class="language-none"><code>${ preformatCode(code) }\n</code></pre>\n</div>`
  }

  if (language === 'samp') {
    return `<div class="pre">\n\n<pre class="language-none"><samp>${ preformatCode(code) }\n</samp></pre>\n</div>`
  }

  const highlighted = Prism.highlight(code, Prism.languages[language], language)

  return `<div class="pre">\n\n<pre class="language-${ language }"><code>${ preformatCode(highlighted) }\n</code></pre>\n</div>`
}

renderer.hr = () => {
  return `<hr />`
}

renderer.image = (href, title, text) => `<div class="image"><img src="${href}" alt="${text}"></div>`

renderer.link = (href, title, text) => {
  if (text.startsWith('http')) return text
  return `<a href="${href}">${text}</a>`
}

renderer.listitem = (text) => {
  return preformatListItem(`<li>${text}</li>\n`)
}

renderer.paragraph = (text) => {
  if (text.startsWith('<div class="image">')) return text
  return `<p>${ preformatParagraph(text) }</p>\n`
}

module.exports = renderer
