/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

function extendConf(conf, api) {
    // register our boot file
    conf.boot.push('~@dustlight/quasar-app-extension-auth-ext/src/boot/register.js')

    // make sure app extension files & ui package gets transpiled
    conf.build.transpileDependencies.push(/quasar-app-extension-auth-ext[\\/]src/)

    // make sure the stylesheet goes through webpack to avoid SSR issues
    conf.css.push('~@dustlight/quasar-ui-auth-ext/src/index.sass')

    conf.framework.plugins.push("SessionStorage", "LocalStorage", "Notify", "Dialog")

    conf.build.env.auth = {
        config: api.prompts
    }
}

module.exports = function (api) {
    // Quasar compatibility check; you may need
    // hard dependencies, as in a minimum version of the "quasar"
    // package or a minimum version of "@quasar/app" CLI
    api.compatibleWith('quasar', '^2.0.0')
    api.compatibleWith('@quasar/app', '^3.0.0')

    // Uncomment the line below if you provide a JSON API for your component
    // api.registerDescribeApi('Auth', '~quasar-ui-auth-ext/src/components/Auth.json')

    // We extend /quasar.conf.js
    api.extendQuasarConf((conf) => extendConf(conf, api))
}
