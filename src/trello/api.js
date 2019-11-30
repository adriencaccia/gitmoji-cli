const axios = require('axios')
const open = require('open')
const fuzzy = require('fuzzy')
const queryString = require('querystring')
const constants = require('../constants')
const config = require('../config')

class TrelloApi {
  constructor () {
    this.trelloApiClient = axios.create({
      baseURL: constants.TRELLO_API_URL,
      timeout: 5000,
      headers: {},
      params: {}
    })
    this.authorizeUrl =
      constants.TRELLO_API_URL +
      'authorize?' +
      queryString.stringify({
        expiration: 'never',
        name: 'gitmoji-trello',
        scope: 'read',
        response_type: 'token',
        key: constants.TRELLO_API_KEY
      })
  }

  async fetchBoards (apiToken = '') {
    const { data: boards } = await this.trelloApiClient.request({
      method: 'GET',
      url: '/members/me/boards',
      params: {
        filter: 'all',
        fields: 'name',
        lists: 'none',
        organization: true,
        organization_fields: 'displayName',
        token: config.getTrelloApiToken() || apiToken,
        key: constants.TRELLO_API_KEY
      }
    })
    return boards
  }

  trelloApiPrompt () {
    open(this.authorizeUrl)
    return [
      {
        name: 'trelloToken',
        message: 'Go to your browser, copy the token and paste it here:',
        validate: async (input) => this.validateTokenAndSetBoards(input)
      }
    ]
  }

  async validateTokenAndSetBoards (trelloToken) {
    try {
      const boards = await this.fetchBoards(trelloToken)
      if (!boards.length) return 'You aren\'t member of any trello boards !'
      config.setTrelloBoards(boards)
      return true
    } catch (error) {
      return 'Invalid token'
    }
  }

  boardsToSearchableSting (boards) {
    return boards.map(board => {
      const boardName = `📋: ${board.name.toLowerCase()}`
      const organizationName = (board.organization && board.organization.displayName)
        ? ` | 🏢: ${board.organization.displayName.toLowerCase()}` : ''
      return {
        name: boardName.concat(organizationName),
        value: board.id
      }
    })
  }

  searchBoards (boards, input) {
    input = input || ''
    return new Promise((resolve) => {
      const fuzzyResult = fuzzy.filter(
        input,
        this.boardsToSearchableSting(boards),
        { extract: (el) => el.name }
      )
      resolve(
        fuzzyResult.map(function (el) {
          return el.original
        })
      )
    })
  }

  trelloBoardsPrompt () {
    const boards = config.getTrelloBoards()
    return [
      {
        name: 'boardId',
        message: 'Choose a Trello board:',
        type: 'autocomplete',
        source: (_, input) => this.searchBoards(boards, input)
      }
    ]
  }

  fetchTicketInfo (ticketNumber) {
    const boardId = config.getTrelloBoardByPwd()
    return this.trelloApiClient.request({
      method: 'GET',
      url: `/boards/${boardId}/cards/${ticketNumber}`,
      params: {
        fields: 'name,shortUrl,idShort',
        checkItemStates: false,
        token: config.getTrelloApiToken(),
        key: constants.TRELLO_API_KEY
      }
    })
  }
}

module.exports = TrelloApi
