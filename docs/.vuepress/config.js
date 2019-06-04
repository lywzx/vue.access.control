module.exports = {
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US',
      title: 'vue access control',
      description: ''
    },
    '/zh/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: 'access.control',
      description: 'access.control是一套基于RBAC(Role based Access Control)的权限管理的库，基于Typescript编辑，适合于浏览器及NodeJs端的权限认证。'
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
          { text: 'GitHub', link: 'https://github.com/lywzx/access.control' }
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
          { text: 'GitHub', link: 'https://github.com/lywzx/access.control' }
        ],
        sidebar: {
          '/zh/': [/* ... */],
          '/zh/nested/': ['/page-b', 'GitHub']
        }
      }
    }
  }
}
