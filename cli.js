#!/usr/bin/env node
const meow = require('meow')
const updateNotifier = require('update-notifier')
const GitmojiCli = require('./src/gitmoji.js')
const pkg = require('./package.json')
const utils = require('./src/utils.js')
const TrelloApi = require('./src/trello/api')

updateNotifier({ pkg }).notify()

const cli = meow(`
  Usage
    $ gitmoji-trello
  Options
    --commit, -c    Interactively commit using the prompts
    --config, -g    Setup gitmoji-trello preferences.
    --init, -i      Initialize gitmoji as a commit hook
    --list, -l      List all the available gitmojis
    --remove, -r    Remove a previously initialized commit hook
    --search, -s    Search gitmojis
    --update, -u    Sync emoji list with the repo
    --version, -v   Print gitmoji-trello installed version
  Examples
    $ gitmoji-trello -l
    $ gitmoji-trello bug linter -s
`, {
  flags: {
    commit: { type: 'boolean', alias: 'c' },
    config: { type: 'boolean', alias: 'g' },
    help: { type: 'boolean', alias: 'h' },
    init: { type: 'boolean', alias: 'i' },
    list: { type: 'boolean', alias: 'l' },
    remove: { type: 'boolean', alias: 'r' },
    search: { type: 'boolean', alias: 's' },
    update: { type: 'boolean', alias: 'u' },
    version: { type: 'boolean', alias: 'v' }
  }
})

const trelloCli = new TrelloApi()
const gitmojiCli = new GitmojiCli(utils.gitmojiApiClient, trelloCli)
const options = {
  commit: () => gitmojiCli.ask('client'),
  config: () => gitmojiCli.config(),
  hook: () => gitmojiCli.ask('hook'),
  init: () => gitmojiCli.init(),
  list: () => gitmojiCli.list(),
  remove: () => gitmojiCli.remove(),
  search: () => cli.input.map(element => gitmojiCli.search(element)),
  update: () => gitmojiCli.updateCache()
}

utils.findGitmojiCommand(cli, options)
