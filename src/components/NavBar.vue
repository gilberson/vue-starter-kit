<template>
    <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
        <div class="container">
            <router-link class="navbar-brand js-scroll-trigger" :to="{ name: 'home' }">GMG Demo App</router-link>
            <button class="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i class="fas fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li :class="[currentRouteName.includes('home') ? activeLink : '','nav-item mx-0 mx-lg-1']">
                        <router-link class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" :to="{ name: 'home' }">Home</router-link>
                    </li>
                    <li :class="[currentRouteName.includes('tasks') || currentRouteName.includes('view-task') || currentRouteName.includes('update-task') || currentRouteName.includes('add-task')  ? activeLink : '','nav-item mx-0 mx-lg-1']">
                        <router-link class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" :to="{ name: 'tasks' }">Tasks</router-link>
                    </li>
                    <li :class="[currentRouteName.includes('users') || currentRouteName.includes('view-user') ? activeLink : '','nav-item mx-0 mx-lg-1']">
                        <router-link class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" :to="{ name: 'users' }">Users</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>


export default {
  name: 'home',
  data: function(){

    return {
      activeLink: 'activeLink'
    }
  },
  computed: {
    currentPage(){
        return this.$route.path
    },
    currentRouteName(){
        return this.$route.name
    }
  }
}
</script>

<style scoped>
  .activeLink{
    opacity: 1;
    visibility: visible;
    background-color: #4DBD9C;
    transition: all 0.25s;
  }
  .activeLink:hover{
      color: white
  }
</style>