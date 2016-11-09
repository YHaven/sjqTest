import $ from 'zepto'

export default function (router) {
  router.map({
    '*': {
      component (resolve) {
        require(['./views/welcome'], resolve)
      }
    },
    '/main': {
      component (resolve) {
        require(['./views/welcome'], resolve)
      }
    },
    '/user/login': {
      component (resolve) {
        require(['./views/login'], resolve)
      }
    },
    '/home': {
      component (resolve) {
        require(['./views/home'], resolve)
      }
    },
    '/home/manlist': {
      component (resolve) {
        require(['./views/home/manlist'], resolve)
      }
    },
    '/list': {
      component (resolve) {
        require(['./views/list'], resolve)
      }
    },
    '/rank': {
      component (resolve) {
        require(['./views/rank'], resolve)
      }
    },
    '/invite': {
      component (resolve) {
        require(['./views/invite'], resolve)
      }
    },
    '/tasks': {
      component (resolve) {
        require(['./views/tasks'], resolve)
      }
    },
    '/user': {
      component (resolve) {
        require(['./views/user'], resolve)
      }
    },
    '/user/tasks': {
      component (resolve) {
        require(['./views/user/tasks'], resolve)
      }
    },
    '/user/withdraw': {
      component (resolve) {
        require(['./views/user/withdraw'], resolve)
      }
    },
    '/user/profile': {
      component (resolve) {
        require(['./views/user/profile'], resolve)
      }
    },
    '/user/profit': {
      component (resolve) {
        require(['./views/user/profit'], resolve)
      }
    },
    '/user/profit/record': {
      component (resolve) {
        require(['./views/user/profitRecord'], resolve)
      }
    },
    '/more': {
      component (resolve) {
        require(['./views/more'], resolve)
      }
    },
    '/more/feedback': {
      component (resolve) {
        require(['./views/more/feedback'], resolve)
      }
    },
    '/more/about': {
      component (resolve) {
        require(['./views/more/about'], resolve)
      }
    },
    '/fashion/recommend': {
      component (resolve) {
        require(['./views/fashion/recommend'], resolve)
      }
    },
    '/fashion/concern': {
      component (resolve) {
        require(['./views/fashion/concern'], resolve)
      }
    },
    '/fashion/topic': {
      component (resolve) {
        require(['./views/fashion/topic'], resolve)
      }
    }

  })

  router.beforeEach(({to, from, next}) => {
    let toPath = to.path
    let fromPath = from.path
    console.log(`to: ${toPath} from: ${fromPath}`)
    if (toPath.replace(/[^/]/g, '').length > 1 ) {
      router.app.isIndex = false
    }
    if(toPath.indexOf('/home')>=0){
      router.app.isIndex = true
    }
    if(toPath.indexOf('/fashion')>=0){
      router.app.isIndex = true
    }
    else {
      let depath = toPath === '/' || toPath === '/invite' || toPath === '/rank'
      router.app.isIndex = depath ? 0 : 1
    }
    next()
  })

  router.afterEach(function ({to}) {
    console.log(`成功浏览到: ${to.path}`)
    $.refreshScroller()
  })
}
