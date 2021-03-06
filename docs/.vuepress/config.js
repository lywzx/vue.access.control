module.exports = {
  head: [ process.env.NODE_ENV === 'production' ? ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?7a4bab4637ad635825376455ce22920c";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
  `] : []],
  base: '/docs/vue.access.control/',
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US',
      title: 'vue access control alias VueAccessControl',
      description: '@lywzx/vue.access.control vue access control'
    },
    '/zh/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: 'Vue权限管理组件(VueAccessControl)',
      description: '@lywzx/vue.access.control是一套基于RBAC(Role based Access Control)的权限管理的库，基于Typescript编辑，适合于浏览器及NodeJs端的权限认证。'
    },
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        algolia: {},
        nav: [
          { text: 'GitHub', link: 'https://github.com/lywzx/vue.access.control' }
        ],
        sidebar: {
          '/': [/* ... */],
          '/nested/': [/* ... */]
        }
      },
      '/zh/': {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        // 编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        // Service Worker 的配置
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新"
          }
        },
        // 当前 locale 的 algolia docsearch 选项
        algolia: {},
        nav: [
          { text: 'GitHub', link: 'https://github.com/lywzx/vue.access.control' }
        ],
        sidebar: [
          '/zh/',
          '/zh/getting-started',
          '/zh/router',
          '/zh/components'
        ]
      }
    }
  }
}
