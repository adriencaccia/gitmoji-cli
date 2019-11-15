const Conf = require('conf')

const constants = require('./constants')
const config = new Conf()

const getAutoAdd = () => config.get(constants.AUTO_ADD)
const getEmojiFormat = () => config.get(constants.EMOJI_FORMAT)
const getSignedCommit = () => config.get(constants.SIGNED_COMMIT)
const getScopePrompt = () => config.get(constants.SCOPE_PROMPT)
const getTrelloTicketNumberPrompt = () => config.get(constants.TRELLO_TICKET_NUMBER_PROMPT)
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

module.exports = {
  getAutoAdd,
  getEmojiFormat,
  getSignedCommit,
  getScopePrompt,
  getTrelloTicketNumberPrompt,
  setAutoAdd,
  setEmojiFormat,
  setSignedCommit,
  setScopePrompt,
  setTrelloTicketNumberPrompt
}