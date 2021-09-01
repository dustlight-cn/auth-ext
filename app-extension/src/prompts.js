/**
 * Quasar App Extension prompts script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/prompts-api
 *
 * Inquirer prompts
 * (answers are available as "api.prompts" in the other scripts)
 * https://www.npmjs.com/package/inquirer#question
 */

module.exports = function () {
  return [
      {
          name: 'authorizationUri',
          type: 'input',
          required: true,
          message: 'Authorization Uri',
          default: 'http://accounts.wgv/authorize'
      },
      {
          name: 'apiEndpoint',
          type: 'input',
          required: true,
          message: 'Api Endpoint',
          default: 'http://api.wgv'
      },
      {
          name: 'clientId',
          type: 'input',
          required: true,
          message: 'ClientID',
          default: '86c3e34e2030000'
      },
      {
          name: 'tokenType',
          type: 'list',
          message: 'Choose Token Type',
          choices: [
              {
                  name: 'Opaque Token',
                  value: 'opaque',
                  short: 'Opaque'
              },
              {
                  name: 'Json Web Token',
                  value: 'jwt',
                  short: 'JWT'
              }
          ]
      },
      {
          name: 'scope',
          type: 'input',
          required: false,
          message: 'Scope'
      }
  ]
}
