import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Members from '../views/Members.vue'
import Publications from '../views/Publications.vue'
import Projects from '../views/Projects.vue'
import Videos from '../views/Videos.vue'
import Sponsors from '../views/Sponsors.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home
  },
  {
    path: '/members',
    name: 'MembersPage',
    component: Members
  },
  {
    path: '/publications',
    name: 'Publications',
    component: Publications
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/videos',
    name: 'Videos',
    component: Videos
  },
  {
    path: '/sponsors',
    name: 'Sponsors',
    component: Sponsors
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
