module.exports = {
  extends: ['./node_modules/commitlint-config-gitmoji'],
  rules: {
    'subject-case': [2, 'always', 'lowerCase'],
    'scope-enum': [2, 'always', ['chore', 'feat', 'test', 'docs', 'fix']],
    'scope-empty': [2, 'never']
  }
};
