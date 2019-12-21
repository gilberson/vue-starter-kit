<template>
  <div id="app">
    <nav-bar></nav-bar>
    <transition name="fade">
      <router-view/>
    </transition>
    <site-footer></site-footer>
    <copy-right></copy-right>
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter'
import CopyRight from './components/CopyRight'

export default {
  name: 'AppLayout',
  props: {
    msg: String
  },
  components: {
    NavBar,
    CopyRight,
    SiteFooter
  }
}
</script>

<style>

</style>
