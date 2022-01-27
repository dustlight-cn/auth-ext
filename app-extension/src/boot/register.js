import { boot } from 'quasar/wrappers'
import VuePlugin from '@dustlight/quasar-ui-auth-ext'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
