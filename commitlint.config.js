module.exports = {
  extends: ['gitmoji'],
  rules: {
    'subject-case': [1, 'always', 'lower-case'],
    'scope-enum': [2, 'always', ['global', 'server', 'frontend', 'mobile', 'clients']],
    'scope-empty': [2, 'never'],
    'header-max-length': [2, 'always', 88]
  }
};
