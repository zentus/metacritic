const axios = require('axios')
const { NEW_SEASONS_URL, NEW_SERIES_URL } = require('../../../constants')
const Util = require('../../../utils')
const getSeries = require('../../item/series')

const listNewSeasons = async (options = {}) => {
  const ENDPOINT_URL = options.newSeries ? NEW_SERIES_URL : NEW_SEASONS_URL
  const response = await axios.get(ENDPOINT_URL)
  const { getElementsArray } = Util.createDom(response.data)
  const listParts = getElementsArray('.clamp-list')

  const promises = listParts
    .reduce((acc, part) => {
      return [...acc, ...Array.from(part.querySelectorAll('tr:not([class="spacer"])'))]
    }, [])
    .map(tr => {
      const titleElement = tr.querySelector('a.title')
      const title = Util.normalizeTitle(titleElement.textContent)
      const seasonReleaseElement = tr.querySelector('span:not([class="mcmust"])')
      const seasonReleaseRaw = seasonReleaseElement.textContent.trim()
      const seasonRelease = Util.toUnixTimestamp(seasonReleaseRaw)
      const urlRaw = titleElement.attributes.item('href').value
      const url = Util.createUrl(urlRaw)

      const [, seriesPath, seasonPath] = url.pathname.split('/').filter(Boolean)
      const season = Number(seasonPath.replace('season-', '').replace('-', '.'))

      return {
        season,
        seasonPath,
        seasonRelease,
        seriesPath,
        title
      }
    })
    .map(async season => {
      return {
        season,
        series: await getSeries(season.seriesPath)
      }
    })

  return Promise.all(promises)
}

module.exports = {
  listNewSeasons,
  listNewSeries: async () => listNewSeasons({ newSeries: true })
}
