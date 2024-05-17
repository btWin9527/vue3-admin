import { Layout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

interface MOD {
  default: ({ Layout, t }) => AppRouteRecordRaw
}

/**
 * vite模块导入方式，动态引入modules路由，配置eager可以实现一次性引入所有模块
 */
export const generateSyncRoutes = () => {
  const modules = import.meta.glob('./modules/*.ts', { eager: true })
  const syncRoutes: AppRouteRecordRaw[] = []

  for (const path in modules) {
    const mod = modules[path] as MOD
    const routes = mod.default({ Layout, t })
    syncRoutes.push(routes)
  }
  return syncRoutes
}
