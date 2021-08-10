import AuthLogin from './components/AuthLogin'
import AuthUserContext from './components/AuthUserContext'
import AuthAvatar from './components/AuthAvatar'
import AuthAvatarButton from './components/AuthAvatarButton'

const version = __UI_VERSION__

function install(app) {
    app.component(AuthLogin.name, AuthLogin)
    app.component(AuthUserContext.name, AuthUserContext)
    app.component(AuthAvatar.name, AuthAvatar)
    app.component(AuthAvatarButton.name, AuthAvatarButton)
}

export {
    version,
    AuthLogin,
    AuthUserContext,
    AuthAvatar,
    AuthAvatarButton,
    install
}
