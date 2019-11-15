# gitmoji-trello

> A [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli) fork with a simple Trello integration

## Install

```bash
$ npm i -g @adriencaccia/gitmoji-trello
```

## Usage

```bash
$ gitmoji-trello --help
```

```
A gitmoji interactive client for using gitmojis on commit messages.

  Usage
    $ gitmoji-trello
  Options
    --init, -i      Initialize gitmoji as a commit hook
    --remove, -r    Remove a previously initialized commit hook
    --config, -g    Setup gitmoji-trello preferences.
    --commit, -c    Interactively commit using the prompts
    --list, -l      List all the available gitmojis
    --search, -s    Search gitmojis
    --version, -v   Print gitmoji-trello installed version
    --update, -u    Sync emoji list with the repo
```

### Commit

You can use the commit functionality in two ways, directly or via a commit-hook.

#### Client

Start the interactive commit client, to auto generate your commit based on your prompts.

```bash
$ gitmoji-trello -c
```

#### Hook

Run the init option, add your changes and commit them, after that the prompts will begin and your commit message will be built.

```bash
$ gitmoji-trello -i # this will create the .git/hooks/prepare-commit-msg
$ git add .
$ git commit
```

### Config

Run `gitmoji-trello -g` to setup some gitmoji-cli preferences, such as the auto `git add .` feature.
