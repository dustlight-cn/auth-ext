import AuthLogin from './components/AuthLogin.vue'
import AuthUserContext from './components/AuthUserContext.vue'
import AuthAvatar from './components/AuthAvatar.vue'
import AuthClientLogo from './components/AuthClientLogo.vue'
import AuthAvatarButton from './components/AuthAvatarButton.vue'
import UserClientList from './components/UserClientList.vue'

const version = "0.0.1-alpha-1"

function install(app) {
    app.component(AuthLogin.name, AuthLogin)
    app.component(AuthUserContext.name, AuthUserContext)
    app.component(AuthAvatar.name, AuthAvatar)
    app.component(AuthClientLogo.name, AuthClientLogo)
    app.component(AuthAvatarButton.name, AuthAvatarButton)
    app.component(UserClientList.name, UserClientList)
}

export {
    version,
    AuthLogin,
    AuthUserContext,
    AuthAvatar,
    AuthClientLogo,
    AuthAvatarButton,
    UserClientList,
    install
}
