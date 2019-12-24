<template>
    <div class="container">
        <div class="row">
            <div class="col task-detail">
                <div class="card card-task">
                    <h5 class="card-header">User Profile</h5>
                    <div class="card-body">
                        <h5 class="card-title">{{ user.name }}</h5>
                        <p class="card-text">
                            {{ user.email }}
                        </p>
                        <router-link :to="{ name : 'task'}">
                            <button type="button" class="btn btn-primary add-task">Task</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'user',
    components: {
    
    },
    data: function() {

        return {

            user: null
        }
    },
    mounted () {
        let id = this.$route.params.id  
        this.getUser(id)
    },
    methods: {

        getUser(id){ 
            this.$api.get('user/' + id)
            .then(response => {
                this.user = response.data
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

        /*border: 1px dotted gray;*/
        margin-top: 6.5em;
        min-height: 350px;
    }
    .card-task{

        margin-top: 3.5em;
    }
</style>