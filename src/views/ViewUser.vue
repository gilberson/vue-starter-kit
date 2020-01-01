<template>
    <div class="container">
        <div class="row">
            <div class="col task-detail">
                <h3 class="user-tasks">Tasks of User {{ user[0].name }}</h3>
                <div v-for="(task, index) in user[0].tasks" :key="index" class="card card-task">
                    <h5 class="card-header">{{ $root.statusToString(task.status) }}</h5>
                    <div class="card-body">
                        <h5 class="card-title">{{ task.title }}</h5>
                        <p class="card-text">
                            {{ task.description }}
                        </p>
                        <router-link :to="{ name : 'update-task', params:{'id': task.id }}">
                            <button type="button" class="btn btn-primary add-task">Update</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'home',
    components: {
    
    },
    data: function() {

        return {
            user: null,
            tasks: null,
            errored: false
        }
    },
    mounted () {
        let id = this.$route.params.id  
        this.getUser(id)
    },
    methods: {

        getUser(id){ 
            this.$api.get('users/' + id)
            .then(response => {
                this.user = response.data.user

                console.log("User : " + response.data.user[0].email)
                //console.log("Tasks : " + response.data.user[0].tasks)
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
        }
    }
}
</script>

<style scoped>
    .task-detail{

        margin-bottom: 2.4em;
        margin-top: 6.5em;
        min-height: 350px;
    }
    .card-task{

        margin-top: 3.5em;
    }

    .user-tasks{
        margin-top: 2em;
        border-bottom:1px solid #D8D8D8;
        padding: 1em;
    }
</style>