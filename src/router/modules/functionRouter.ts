const generateFunctionRouter = ({ Layout, t }) => ({
  path: '/function',
  component: Layout,
  redirect: '/function/multipleTabs',
  name: 'Function',
  meta: {
    title: t('router.function'),
    icon: 'ri:function-fill',
    alwaysShow: true
  },
  children: [
    {
      path: 'multiple-tabs',
      component: () => import('@/views/Function/MultipleTabs.vue'),
      name: 'MultipleTabs',
      meta: {
        title: t('router.multipleTabs')
      }
    },
    {
      path: 'multiple-tabs-demo/:id',
      component: () => import('@/views/Function/MultipleTabsDemo.vue'),
      name: 'MultipleTabsDemo',
      meta: {
        hidden: true,
        title: t('router.details'),
        canTo: true,
        activeMenu: '/function/multiple-tabs'
      }
    },
    {
      path: 'request',
      component: () => import('@/views/Function/Request.vue'),
      name: 'Request',
      meta: {
        title: t('router.request')
      }
    },
    {
      path: 'test',
      component: () => import('@/views/Function/Test.vue'),
      name: 'Test',
      meta: {
        title: t('router.permission'),
        permission: ['add', 'edit', 'delete']
      }
    }
  ]
})
export default generateFunctionRouter
