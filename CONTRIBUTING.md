# Contributing

I can't thank you enough for wanting to contribute!

Working on your first Pull Request? You can learn how from this free series How to Contribute to an Open Source Project on GitHub

## Project setup

1. Fork and clone the repo

2. Then run `yarn` or `npm install` to install the dependencies.

3. Create a branch for your PR with `git checkout -b pr/your-branch-name`

Tip: Keep your main branch pointing at the original repository and make pull requests from branches on your fork. To do this, run:

```bash
git remote add upstream https://github.com/alekangelov/zaibatsi-bud_app.git
git fetch upstream
git branch --set-upstream-to=upstream/main main
```

4. Make an env file

```
# this is .env.electron.dev
# filename schema is .env.{app-mode}.{environment}
REACT_APP_NAME="Zaibatsu Bud"
REACT_APP_MODE=web | electron
INLINE_RUNTIME_CHUNK=false # THIS HAS TO BE FALSE OR ELSE IT WON'T WORK!
NODE_ENV=development | production
```

5. Make a PR to the original repo!

## Help needed

Click on the issues tab on the repo
