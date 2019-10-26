// @flow
const path = require('path')
const fs = require('fs')
const pathExists = require('path-exists')

export const GITMOJI_CACHE: Object = {
  FOLDER: '.gitmoji',
  FILE: 'gitmojis.json'
}

export const CACHE_PATH = path.join(
  process.env.HOME || process.env.USERPROFILE,
  GITMOJI_CACHE.FOLDER,
  GITMOJI_CACHE.FILE
)

const createEmojis = (emojis: Array<Object>) => {
  if (!pathExists.sync(path.dirname(CACHE_PATH))) {
    fs.mkdirSync(path.dirname(CACHE_PATH))
  }

  fs.writeFileSync(CACHE_PATH, JSON.stringify(emojis))
}

const getEmojis = () => {
  return Promise.resolve(JSON.parse(fs.readFileSync(CACHE_PATH)))
}

const isAvailable = () => pathExists.sync(CACHE_PATH)

export default {
  createEmojis,
  getEmojis,
  isAvailable
}
