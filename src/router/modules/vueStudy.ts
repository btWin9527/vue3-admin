import { Layout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const vueStudyRoutes: AppRouteRecordRaw = {
  path: '/vueStudy',
  component: Layout,
  name: 'VueStudy',
  meta: {
    title: t('router.vueStudy'),
    icon: 'ant-design:dashboard-filled',
    alwaysShow: true
  },
  children: [
    {
      path: 'windiPage',
      component: () => import('@/views/WindiPage/Windi.vue'),
      name: 'WindiPage',
      meta: {
        title: t('router.windiPage')
      }
    }
  ]
}
