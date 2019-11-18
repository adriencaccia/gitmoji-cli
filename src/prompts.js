const constants = require('./constants')
const configVault = require('./config')
const guard = require('./guard')
const utils = require('./utils')

const config = [
  {
    name: constants.AUTO_ADD,
    message: 'Enable automatic "git add ."',
    type: 'confirm'
  },
  {
    name: constants.EMOJI_FORMAT,
    message: 'Select how emojis should be used in commits',
    type: 'list',
    choices: [
      { name: ':smile:', value: 'code' }, { name: '😄', value: 'emoji' }
    ]
  },
  {
    name: constants.SIGNED_COMMIT,
    message: 'Enable signed commits',
    type: 'confirm'
  },
  {
    name: constants.SCOPE_PROMPT,
    message: 'Enable scope prompt',
    type: 'confirm'
  },
  {
    name: constants.TRELLO_TICKET_NUMBER_PROMPT,
    message: 'Enable Trello ticket number prompt',
    type: 'confirm'
  }
]

const gitmoji = (gitmojis) => {
  const trelloTickerNumberFromCurrentBranch = utils.getTrelloTicketNumberFromCurrentBranch()
  return [
    {
      name: 'gitmoji',
      message: 'Choose a gitmoji:',
      type: 'autocomplete',
      source: (answersSoFor, input) => {
        return Promise.resolve(
          gitmojis.filter((gitmoji) => {
            const emoji = gitmoji.name.concat(gitmoji.description).toLowerCase()
            return (!input || emoji.indexOf(input.toLowerCase()) !== -1)
          })
            .map((gitmoji) => ({
              name: `${gitmoji.emoji}  - ${gitmoji.description}`,
              value: gitmoji[configVault.getEmojiFormat() || constants.EMOJI]
            }))
        )
      }
    },
    ...(configVault.getTrelloTicketNumberPrompt() !== true ? [] : [{
      name: 'trelloTicketNumber',
      message: 'Enter the number of the current Trello ticket',
      ...(trelloTickerNumberFromCurrentBranch && { default: trelloTickerNumberFromCurrentBranch }),
      validate: guard.trelloTicketNumber
    }]),
    ...(configVault.getScopePrompt() !== true ? [] : [{
      name: 'scope',
      message: 'Enter the scope of current changes',
      validate: guard.scope
    }]),
    {
      name: 'title',
      message: 'Enter the commit title',
      validate: guard.title,
      transformer: (input, answers) => utils.inputCountTransformer(
        input,
        utils.getTitleMaxLength(answers.trelloTicketNumber)
      )
    },
    {
      name: 'message',
      message: 'Enter the commit message:',
      validate: guard.message
    }
  ]
}

module.exports = {
  config,
  gitmoji
}
