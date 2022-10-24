# @zentus/metacritic

A Metacritic web scraper

## Installation

```
npm install @zentus/metacritic
```

## Usage

```
const metacritic = require('@zentus/metacritic')

metacritic.list.newSeasons().then(console.log)

metacritic.list.newSeries().then(console.log)

metacritic.series.get('harley-quinn').then(console.log)
```
