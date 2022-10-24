const { URL } = require('node:url')
const { JSDOM } = require('jsdom')
const { BASE_URL } = require('./constants')

const toUnixTimestamp = string => new Date(string).getTime()

const createDom = html => {
  const dom = new JSDOM(html)
  const { window } = dom
  const { document } = window
  const getElementsArray = (selector, element) => Array.from((element || document).querySelectorAll(selector))

  return { document, dom, getElementsArray, window }
}

const createUrl = urlPath => new URL(`${BASE_URL}${urlPath}`)

const normalizeTitle = title => title.replace(/: Season [0-9]+/, '').replace(/\([0-9]{4}\)/, '').trim()
const normalizeDistributor = distributor => distributor.replace('|', '').trim()

module.exports = {
  createDom,
  createUrl,
  normalizeDistributor,
  normalizeTitle,
  toUnixTimestamp
}
