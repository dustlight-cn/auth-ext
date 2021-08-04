import Component from './components/Component'
import AuthLogin from './components/AuthLogin'
import AuthUserContext from './components/AuthUserContext'

const version = __UI_VERSION__

function install(app) {
    app.component(Component.name, Component)
    app.component(AuthLogin.name, AuthLogin)
    app.component(AuthUserContext.name, AuthUserContext)
}

export {
    version,
    Component,
    AuthLogin,
    AuthUserContext,
    install
}
