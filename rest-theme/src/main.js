/* global wp */

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(require('vue-resource'))
Vue.use(VueRouter)

Vue.config.debug = true

import Posts from './posts.vue'
import Post from './post.vue'
import Page from './page.vue'
import Header from './theme-header.vue'
import Footer from './theme-footer.vue'

Vue.component('Post', Post)
Vue.component('Page', Page)
Vue.component('theme-header', Header)
Vue.component('theme-footer', Footer)

var
  App = Vue.extend({
    template: `
<div>
  <theme-header></theme-header>
  <div class="container">
    <router-view></router-view>
  </div>
  <theme-footer></theme-footer>
<div>`,

    ready() {
      this.updateTitle('')
    },

    methods: {
      updateTitle(pageTitle) {
        document.title = (pageTitle ? pageTitle + ' - ' : '') + wp.site_name
      }
    },

    events: {
      'page-title': function (pageTitle) {
        this.updateTitle(pageTitle)
      }
    }
  }),

  router = new VueRouter({
    hashbang: false,
    history: true
  }),

  key, route

router.on(wp.base_path, {
  component: Posts
})

for (key in wp.routes) {
  route = wp.routes[key]
  router.on(wp.base_path + route.slug, {
    component: Vue.component(route.type.capitalize()),
    postId: route.id
  })
}

router.start(App, '#app')
