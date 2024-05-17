const generateDashboardRouter = ({ Layout, t }) => ({
  path: '/dashboard',
  component: Layout,
  redirect: '/dashboard/analysis',
  name: 'Dashboard',
  meta: {
    title: t('router.dashboard'),
    icon: 'ant-design:dashboard-filled',
    alwaysShow: true
  },
  children: [
    {
      path: 'analysis',
      component: () => import('@/views/Dashboard/Analysis.vue'),
      name: 'Analysis',
      meta: {
        title: t('router.analysis'),
        noCache: true,
        affix: true
      }
    },
    {
      path: 'workplace',
      component: () => import('@/views/Dashboard/Workplace.vue'),
      name: 'Workplace',
      meta: {
        title: t('router.workplace'),
        noCache: true
      }
    }
  ]
})

export default generateDashboardRouter
