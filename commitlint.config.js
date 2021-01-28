module.exports = {
  extends: ['gitmoji'],
  rules: {
    'subject-case': [2, 'always', 'lowerCase'],
    'scope-enum': [2, 'always', ['global', 'server', 'frontend', 'mobile', 'clients']],
    'scope-empty': [2, 'never']
  }
};
