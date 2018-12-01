import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: submenu only apppear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/goods/category',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/area',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/area/index'),
        name: 'Area',
        meta: { title: 'area', icon: 'area', noCache: true }
      }
    ]
  },
  {
    path: '/container',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'container', icon: 'container', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/container/index'),
        name: 'Container',
        meta: { title: 'containers', noCache: true }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    meta: {
      title: 'goods',
      icon: 'el-icon-date'
    },
    children: [
      {
        path: 'category',
        component: () => import('@/views/goods/category/GoodsCategory'),
        name: 'GoodsCategory',
        meta: { title: 'goodsCategory', noCache: true }
      },
      {
        path: 'brand',
        component: () => import('@/views/goods/brand/GoodsBrand'),
        name: 'GoodsBrand',
        meta: { title: 'goodsBrand', noCache: true }
      },
      {
        path: 'info',
        component: () => import('@/views/goods/GoodsInfo'),
        name: 'GoodsInfo',
        meta: { title: 'goodsInfo', noCache: true }
      },
      {
        path: 'label',
        component: () => import('@/views/goods/GoodsLabel'),
        name: 'GoodsLabel',
        meta: { title: 'goodsLabel', noCache: true }
      }
    ]
  },
  {
    path: '/operation',
    component: Layout,
    meta: { title: 'operation', icon: 'operation' },
    children: [
      {
        path: 'goods',
        component: () => import('@/views/operation/ContainerGoods'),
        name: 'ContainerGoods',
        meta: { title: 'containerGoods', noCache: true }
      }, {
        path: 'inbound',
        component: () => import('@/views/operation/GoodsInbound'),
        name: 'GoodsInbound',
        meta: { title: 'goodsInbound', noCache: true }
      },
      {
        path: 'outbound',
        component: () => import('@/views/operation/GoodsOutbound'),
        name: 'GoodsOutbound',
        meta: { title: 'goodsOutbound', noCache: true }
      }
    ]
  },
  {
    path: '/market',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'market',
      icon: 'el-icon-menu'
    },
    children: [
      {
        path: 'promotion',
        component: () => import('@/views/market/Promotion'),
        name: 'Promotion',
        meta: { title: 'promotion', noCache: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'user',
      icon: 'el-icon-news'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/user/User'),
        name: 'UserList',
        meta: { title: 'userList', icon: 'example', noCache: true }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'order',
      icon: 'el-icon-goods'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/order/OrderList'),
        name: 'Order',
        meta: { title: 'orderList', noCache: true }
      },
      {
        path: 'item',
        component: () => import('@/views/order/OrderItem'),
        name: 'OrderItem',
        meta: { title: 'orderItem', noCache: true }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'report',
      icon: 'el-icon-menu'
    },
    children: [
      {
        path: 'sales',
        component: () => import('@/views/report/SalesReport'),
        name: 'SalesReport',
        meta: { title: 'salesReport', noCache: true }
      },
      {
        path: 'areas',
        component: () => import('@/views/report/AreaSalesReport'),
        name: 'AreaSalesReport',
        meta: { title: 'areaSalesReport', noCache: true }
      },
      {
        path: 'containers',
        component: () => import('@/views/report/ContainerSalesReport'),
        name: 'ContainerSalesReport',
        meta: { title: 'containerSalesReport', noCache: true }
      },
      {
        path: 'types',
        component: () => import('@/views/report/GoodsTypeSalesReport'),
        name: 'GoodsTypeSalesReport',
        meta: { title: 'goodsTypeSalesReport', noCache: true }
      },
      {
        path: 'goods',
        component: () => import('@/views/report/GoodsSalesReport'),
        name: 'GoodsSalesReport',
        meta: { title: 'goodsSalesReport', noCache: true }
      }
    ]
  },
  {
    path: '/image',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/image/index'),
        name: 'Image',
        meta: { title: 'image', icon: 'el-icon-picture-outline', noCache: true }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    meta: {
      title: 'config',
      icon: 'config'
    },
    children: [
      {
        path: 'person',
        component: () => import('@/views/person/index'),
        name: 'Person',
        meta: { title: 'person', icon: 'people', noCache: true }
      },
      {
        path: 'company',
        component: () => import('@/views/company/index'),
        name: 'Company',
        meta: { title: 'company', icon: 'tab', noCache: true }
      }
    ]
  },
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'pagePermission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'directivePermission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     }
  //   ]
  // },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/svg-icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ],
    hidden: true
  },

  /** When your routing table is too long, you can split it into small modules**/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  //
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'example',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'createArticle', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'editArticle', noCache: true },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'articleList', icon: 'list' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'tab', icon: 'tab' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/errorPage/401'),
  //       name: 'Page401',
  //       meta: { title: 'page401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/errorPage/404'),
  //       name: 'Page404',
  //       meta: { title: 'page404', noCache: true }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/errorLog/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'errorLog', icon: 'bug' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/exportExcel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'exportExcel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/selectExcel'),
  //       name: 'EelectExcel',
  //       meta: { title: 'selectExcel' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/uploadExcel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'uploadExcel' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'exportZip' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'theme', icon: 'theme' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/i18n-demo/index'),
  //       name: 'I18n',
  //       meta: { title: 'i18n', icon: 'international' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'externalLink', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]
