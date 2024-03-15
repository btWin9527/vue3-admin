import type { App } from 'vue'
import { createPinia } from 'pinia'
// 数据持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()

store.use(piniaPluginPersistedstate)

export const setupStore = (app: App<Element>) => {
  app.use(store)
}

export { store }
