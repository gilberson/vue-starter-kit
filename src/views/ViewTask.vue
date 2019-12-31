<template>
    <div class="container">
        <div class="row">
            <div class="col task-detail">
                <div class="card card-task">
                    <h5 class="card-header">Task Detail</h5>
                    <div class="card-body">
                        <h5 class="card-title">{{ task.title }}</h5>
                        <p class="card-text">
                            {{ task.description }}
                        </p>
                        <router-link :to="{ name : 'tasks'}">
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
    name: 'home',
    components: {
    
    },
    data: function() {

        return {

            task: null
        }
    },
    mounted () {
        let id = this.$route.params.id  
        this.getTask(id)
    },
    methods: {

        getTask(id){ 
            this.$api.get('tasks/' + id)
            .then(response => {
                this.task = response.data
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