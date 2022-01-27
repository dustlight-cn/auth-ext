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
            default: 'https://accounts.dustlight.cn/authorize'
        },
        {
            name: 'apiEndpoint',
            type: 'input',
            required: true,
            message: 'Api Endpoint',
            default: 'https://api.dustlight.cn'
        },
        {
            name: 'clientId',
            type: 'input',
            required: true,
            message: 'ClientID',
            default: 'test'
        },
        {
            name: 'tokenType',
            type: 'list',
            message: 'Choose Token Type',
            choices: [
                {
                    name: 'Json Web Token',
                    value: 'jwt',
                    short: 'JWT'
                },
                {
                    name: 'Opaque Token',
                    value: 'opaque',
                    short: 'Opaque'
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
