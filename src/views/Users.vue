<template>
    <div class="container">
        <div class="row">
            <div class="col task-detail">
                <h1>USERS PAGE</h1>
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
        //let id = this.$route.params.id  
        //this.getTask(id)
    },
    methods: {

        /*getTask(id){ 
            this.$api.get('/task/' + id)
            .then(response => {
                this.task = response.data
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
        }*/
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