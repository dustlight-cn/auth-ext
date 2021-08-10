import AuthLogin from './components/AuthLogin.vue'
import AuthUserContext from './components/AuthUserContext.vue'
import AuthAvatar from './components/AuthAvatar.vue'
import AuthAvatarButton from './components/AuthAvatarButton.vue'

const version = "0.0.1-alpha-1"

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
