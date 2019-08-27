import Vue from 'vue'
import Router from 'vue-router'
import editor from '@/components/tinymce-editor'
import style from '@/components/style-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'editor',
      components: {
        default:editor,
        'style':style
      }
    }
  ]
})
