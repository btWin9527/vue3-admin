import { Layout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const useHooksRouter: AppRouteRecordRaw = {
  path: '/hooks',
  component: Layout,
  redirect: '/hooks/useWatermark',
  name: 'Hooks',
  meta: {
    title: 'hooks',
    icon: 'ic:outline-webhook',
    alwaysShow: true
  },
  children: [
    {
      path: 'useClipboard',
      component: () => import('@/views/hooks/useClipboard.vue'),
      name: 'UseClipboard',
      meta: {
        title: 'useClipboard'
      }
    },
    {
      path: 'useWatermark',
      component: () => import('@/views/hooks/useWatermark.vue'),
      name: 'UseWatermark',
      meta: {
        title: 'useWatermark'
      }
    },
    {
      path: 'useCrudSchemas',
      component: () => import('@/views/hooks/useCrudSchemas.vue'),
      name: 'UseCrudSchemas',
      meta: {
        title: 'useCrudSchemas'
      }
    },
    {
      path: 'useNetwork',
      component: () => import('@/views/hooks/useNetwork.vue'),
      name: 'UseNetwork',
      meta: {
        title: 'useNetwork'
      }
    }
  ]
}
