const axios = require('axios')
const execa = require('execa')
const fs = require('fs')

const constants = require('./constants')

const gitmojiApiClient = axios.create({
  baseURL: 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master',
  timeout: 5000,
  headers: {},
  params: {}
})

/**
* @param {Object} cli - The cli object that returns meow()
* @param {Object} cli.flags - The cli flags matched against the input
* @param {Object} options - The mapping for a command to the gitmoji-cli method
* @return {Function}
**/
const findGitmojiCommand = (cli, options) => {
  const flags = cli.flags
  const matchedFlagsWithInput = Object.keys(flags)
    .map((flag) => flags[flag] && flag)
    .filter((flag) => options[flag])

  return options[matchedFlagsWithInput]
    ? options[matchedFlagsWithInput]()
    : cli.showHelp()
}

const inputCountTransformer = (input, maxLength, title) => {
  return `[${input.length || title.length}/${maxLength}]: ${input}`
}

const getTrelloTicketNumberFromCurrentBranch = () => {
  try {
    const result = execa.sync('git', ['rev-parse', '--abbrev-ref', 'HEAD'])
    const trelloTicketNumberRegex = /\/(\d+)/g
    const regexMatch = trelloTicketNumberRegex.exec(result.stdout)
    return regexMatch && regexMatch.length > 1 && regexMatch[1] > 0 && regexMatch[1]
  } catch (e) { return false }
}

const getTitleMaxLength = trelloTicketNumber =>
  constants.TITLE_MAX_LENGTH_COUNT -
  (trelloTicketNumber && trelloTicketNumber.length
    ? trelloTicketNumber.length + constants.TRELLO_TICKET_CHARACTERS_ADDED
    : 0)

const getDefaultTitleAndMessage = () => {
  try {
    const commitFilePath = process.argv[3]
    const commitFileContent = fs.readFileSync(commitFilePath).toString().split('\n')
    return {
      title: commitFileContent.length ? commitFileContent[0] : '',
      message: commitFileContent.length >= 3 ? commitFileContent[2] : ''
    }
  } catch (e) {
    return {
      title: '',
      message: ''
    }
  }
}

module.exports = {
  findGitmojiCommand,
  gitmojiApiClient,
  inputCountTransformer,
  getTrelloTicketNumberFromCurrentBranch,
  getTitleMaxLength,
  getDefaultTitleAndMessage
}
