const getSeries = require('./endpoints/item/series')
const { listNewSeasons, listNewSeries } = require('./endpoints/list/series/seasons')

const series = {
  get: getSeries
}

const list = {
  newSeasons: listNewSeasons,
  newSeries: listNewSeries
}

const metacritic = {
  list,
  series
}

module.exports = metacritic
