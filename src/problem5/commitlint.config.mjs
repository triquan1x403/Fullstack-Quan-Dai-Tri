export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'hotfix',
        'opt',
        'init',
        'bug',
        'deploy',
        'setup',
      ],
    ],
  },
  formatter: '@commitlint/format',
  ignores: [(commit) => commit === ''],
};
