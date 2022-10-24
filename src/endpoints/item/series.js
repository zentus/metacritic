const axios = require('axios')
const Util = require('../../utils')

module.exports = async seriesPath => {
  const url = Util.createUrl(`/tv/${seriesPath}`)
  const response = await axios.get(url.href)
  const { document } = Util.createDom(response.data)

  const distReleaseElement = document.querySelector('.cert_rating_wrapper')
  const distributorElements = distReleaseElement.querySelectorAll('span[class="distributor"]')
  const distributors = Array.from(distributorElements)
    .map(el => Util.normalizeDistributor(el.textContent))
  const releaseDateElement = distReleaseElement.querySelector('span[class="release_date"] span:not([class="label"])')
  const releaseDateRaw = releaseDateElement.textContent.trim()
  const releaseDate = Util.toUnixTimestamp(releaseDateRaw)

  const summaryElement = document.querySelector('.summary_deck span:not([class="label"])')
  const summary = summaryElement.textContent.trim()

  const titleElement = document.querySelector('.product_page_title')
  const title = Util.normalizeTitle(titleElement.textContent.trim())

  const metascoreElement = document.querySelector('.metascore_w')
  const metascore = Number(metascoreElement.textContent.trim())

  const genresElement = document.querySelector('div.genres span:not([class="label"])')
  const genres = Array.from(genresElement.childNodes)
    .map(s => s.textContent.trim())
    .filter(s => Boolean(s) && s !== ',')

  return {
    distributors,
    genres,
    metascore,
    releaseDate,
    seriesUrl: url.href,
    summary,
    title
  }
}
