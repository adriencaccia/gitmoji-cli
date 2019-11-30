const Conf = require('conf')
const execa = require('execa')

const constants = require('./constants')
const config = new Conf()

const getAutoAdd = () => config.get(constants.AUTO_ADD)
const getEmojiFormat = () => config.get(constants.EMOJI_FORMAT)
const getSignedCommit = () => config.get(constants.SIGNED_COMMIT)
const getScopePrompt = () => config.get(constants.SCOPE_PROMPT)
const getTrelloTicketNumberPrompt = () => config.get(constants.TRELLO_TICKET_NUMBER_PROMPT)
const getTrelloApiKey = () => constants.TRELLO_API_KEY
const getTrelloApiToken = () => config.get(constants.TRELLO_API_TOKEN)
const getTrelloBoards = () => config.get(constants.TRELLO_BOARDS)
const getTrelloBoardByPwd = () => {
  const pwd = execa.sync('pwd')
  return config.get(`${constants.TRELLO_BOARD_BY_PWD}.${pwd.stdout}`)
}

const setAutoAdd = (autoAdd) => config.set(constants.AUTO_ADD, autoAdd)
const setEmojiFormat = (emojiFormat) => {
  config.set(constants.EMOJI_FORMAT, emojiFormat)
}
const setSignedCommit = (signedCommit) => {
  config.set(constants.SIGNED_COMMIT, signedCommit)
}
const setScopePrompt = (scopePrompt) => {
  config.set(constants.SCOPE_PROMPT, scopePrompt)
}
const setTrelloTicketNumberPrompt = (trelloTicketNumberPrompt) => {
  config.set(constants.TRELLO_TICKET_NUMBER_PROMPT, trelloTicketNumberPrompt)
}
const setTrelloApiToken = (trelloApiToken) => {
  config.set(constants.TRELLO_API_TOKEN, trelloApiToken)
}
const setTrelloBoards = (trelloBoards) => {
  config.set(constants.TRELLO_BOARDS, trelloBoards)
}
const setTrelloBoardByPwd = (boardId) => {
  const pwd = execa.sync('pwd')
  config.set(`${constants.TRELLO_BOARD_BY_PWD}.${pwd.stdout}`, boardId)
}

module.exports = {
  getAutoAdd,
  getEmojiFormat,
  getSignedCommit,
  getScopePrompt,
  getTrelloTicketNumberPrompt,
  getTrelloApiKey,
  getTrelloApiToken,
  getTrelloBoards,
  getTrelloBoardByPwd,
  setAutoAdd,
  setEmojiFormat,
  setSignedCommit,
  setScopePrompt,
  setTrelloTicketNumberPrompt,
  setTrelloApiToken,
  setTrelloBoards,
  setTrelloBoardByPwd
}
