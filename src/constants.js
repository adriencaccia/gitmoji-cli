const AUTO_ADD = 'autoAdd'
const CODE = 'code'
const EMOJI = 'emoji'
const EMOJI_FORMAT = 'emojiFormat'
const HOOK_MODE = 'hook'
const HOOK_FILE_CONTENTS = `#! /bin/bash
# gitmoji-trello as a commit hook

# strict mode for bash
set -eo pipefail
IFS=$'\\n\\t'

readonly COMMIT_MSG_FILE=$1
# no undefined variables
set -u

BRANCH_NAME="$(git branch | sed -e 's/* //')"
if [[ ! "$BRANCH_NAME" =~ 'no branch' ]]; then
  exec < /dev/tty
  gitmoji-trello --hook "$COMMIT_MSG_FILE"
fi
`
const HOOK_PATH = '/hooks/prepare-commit-msg'
const HOOK_PERMISSIONS = 0o775
const SIGNED_COMMIT = 'signedCommit'
const TITLE_MAX_LENGTH_COUNT = 48
const SCOPE_PROMPT = 'scopePrompt'
const TRELLO_TICKET_NUMBER_PROMPT = 'trelloTicketNumberPrompt'

module.exports = {
  AUTO_ADD,
  CODE,
  EMOJI,
  EMOJI_FORMAT,
  HOOK_FILE_CONTENTS,
  HOOK_MODE,
  HOOK_PATH,
  HOOK_PERMISSIONS,
  SIGNED_COMMIT,
  TITLE_MAX_LENGTH_COUNT,
  SCOPE_PROMPT,
  TRELLO_TICKET_NUMBER_PROMPT
}
