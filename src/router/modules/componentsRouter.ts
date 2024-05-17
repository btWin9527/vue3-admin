import { getParentLayout } from '@/utils/routerHelper'

const generateComponentsRouter = ({ Layout, t }) => ({
  path: '/components',
  component: Layout,
  name: 'ComponentsDemo',
  meta: {
    title: t('router.component'),
    icon: 'bx:bxs-component',
    alwaysShow: true
  },
  children: [
    {
      path: 'form',
      component: getParentLayout(),
      redirect: '/components/form/default-form',
      name: 'Form',
      meta: {
        title: t('router.form'),
        alwaysShow: true
      },
      children: [
        {
          path: 'default-form',
          component: () => import('@/views/Components/Form/DefaultForm.vue'),
          name: 'DefaultForm',
          meta: {
            title: t('router.defaultForm')
          }
        },
        {
          path: 'use-form',
          component: () => import('@/views/Components/Form/UseFormDemo.vue'),
          name: 'UseForm',
          meta: {
            title: 'UseForm'
          }
        }
      ]
    },
    {
      path: 'table',
      component: getParentLayout(),
      redirect: '/components/table/default-table',
      name: 'TableDemo',
      meta: {
        title: t('router.table'),
        alwaysShow: true
      },
      children: [
        {
          path: 'default-table',
          component: () => import('@/views/Components/Table/DefaultTable.vue'),
          name: 'DefaultTable',
          meta: {
            title: t('router.defaultTable')
          }
        },
        {
          path: 'use-table',
          component: () => import('@/views/Components/Table/UseTableDemo.vue'),
          name: 'UseTable',
          meta: {
            title: 'UseTable'
          }
        },
        {
          path: 'tree-table',
          component: () => import('@/views/Components/Table/TreeTable.vue'),
          name: 'TreeTable',
          meta: {
            title: t('router.treeTable')
          }
        },
        {
          path: 'table-image-preview',
          component: () => import('@/views/Components/Table/TableImagePreview.vue'),
          name: 'TableImagePreview',
          meta: {
            title: t('router.PicturePreview')
          }
        },
        {
          path: 'table-video-preview',
          component: () => import('@/views/Components/Table/TableVideoPreview.vue'),
          name: 'TableVideoPreview',
          meta: {
            title: t('router.tableVideoPreview')
          }
        },
        {
          path: 'card-table',
          component: () => import('@/views/Components/Table/CardTable.vue'),
          name: 'CardTable',
          meta: {
            title: t('router.cardTable')
          }
        }
      ]
    },
    {
      path: 'editor-demo',
      component: getParentLayout(),
      redirect: '/components/editor-demo/editor',
      name: 'EditorDemo',
      meta: {
        title: t('router.editor'),
        alwaysShow: true
      },
      children: [
        {
          path: 'editor',
          component: () => import('@/views/Components/Editor/Editor.vue'),
          name: 'Editor',
          meta: {
            title: t('router.richText')
          }
        },
        {
          path: 'json-editor',
          component: () => import('@/views/Components/Editor/JsonEditor.vue'),
          name: 'JsonEditor',
          meta: {
            title: t('router.jsonEditor')
          }
        }
      ]
    },
    {
      path: 'search',
      component: () => import('@/views/Components/Search.vue'),
      name: 'Search',
      meta: {
        title: t('router.search')
      }
    },
    {
      path: 'descriptions',
      component: () => import('@/views/Components/Descriptions.vue'),
      name: 'Descriptions',
      meta: {
        title: t('router.descriptions')
      }
    },
    {
      path: 'image-viewer',
      component: () => import('@/views/Components/ImageViewer.vue'),
      name: 'ImageViewer',
      meta: {
        title: t('router.imageViewer')
      }
    },
    {
      path: 'dialog',
      component: () => import('@/views/Components/Dialog.vue'),
      name: 'Dialog',
      meta: {
        title: t('router.dialog')
      }
    },
    {
      path: 'icon',
      component: () => import('@/views/Components/Icon.vue'),
      name: 'Icon',
      meta: {
        title: t('router.icon')
      }
    },
    {
      path: 'icon-picker',
      component: () => import('@/views/Components/IconPicker.vue'),
      name: 'IconPicker',
      meta: {
        title: t('router.iconPicker')
      }
    },
    {
      path: 'echart',
      component: () => import('@/views/Components/Echart.vue'),
      name: 'Echart',
      meta: {
        title: t('router.echart')
      }
    },
    {
      path: 'count-to',
      component: () => import('@/views/Components/CountTo.vue'),
      name: 'CountTo',
      meta: {
        title: t('router.countTo')
      }
    },
    {
      path: 'qrcode',
      component: () => import('@/views/Components/Qrcode.vue'),
      name: 'Qrcode',
      meta: {
        title: t('router.qrcode')
      }
    },
    {
      path: 'highlight',
      component: () => import('@/views/Components/Highlight.vue'),
      name: 'Highlight',
      meta: {
        title: t('router.highlight')
      }
    },
    {
      path: 'infotip',
      component: () => import('@/views/Components/Infotip.vue'),
      name: 'Infotip',
      meta: {
        title: t('router.infotip')
      }
    },
    {
      path: 'input-password',
      component: () => import('@/views/Components/InputPassword.vue'),
      name: 'InputPassword',
      meta: {
        title: t('router.inputPassword')
      }
    },
    {
      path: 'waterfall',
      component: () => import('@/views/Components/Waterfall.vue'),
      name: 'waterfall',
      meta: {
        title: t('router.waterfall')
      }
    },
    {
      path: 'image-cropping',
      component: () => import('@/views/Components/ImageCropping.vue'),
      name: 'ImageCropping',
      meta: {
        title: t('router.imageCropping')
      }
    },
    {
      path: 'video-player',
      component: () => import('@/views/Components/VideoPlayer.vue'),
      name: 'VideoPlayer',
      meta: {
        title: t('router.videoPlayer')
      }
    },
    {
      path: 'avatars',
      component: () => import('@/views/Components/Avatars.vue'),
      name: 'Avatars',
      meta: {
        title: t('router.avatars')
      }
    },
    {
      path: 'i-agree',
      component: () => import('@/views/Components/IAgree.vue'),
      name: 'IAgree',
      meta: {
        title: t('router.iAgree')
      }
    }
  ]
})
export default generateComponentsRouter
