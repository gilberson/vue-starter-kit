<template>
  <div class="container">
    <div class="row">
      <div class="col task-content">
        <section v-if="errored">
            <div class="alert alert-danger" role="alert">
                The task has not been created
            </div>
        </section>

        <section v-if="loading">
            <p>Saving...</p>
        </section>

        <section v-if="successed">
            <div class="alert alert-success" role="alert">
                The task has been created
            </div>
        </section>

        <div v-if="created" class="alert alert-primary" role="alert">
            The task has been created
        </div>
        <h1>Add a new task</h1>
        <form>
            <div class="form-group">
                <label for="title">Task name</label>
                <input type="text" v-model="title" class="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter a title">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea v-model="description" class="form-control" id="description" rows="5" placeholder="Enter the description"></textarea>
            </div>
            <button type="button" v-on:click="addTask()" class="btn btn-primary">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import MastHead from '../components/MastHead.vue'

export default {
  name: 'home',
  components: {

  },
  data: function(){

    return {
        user_id: 5,
        title: '',
        description: '',
        status: 0,
        tasks: null,
        loading: false,
        errored: false,
        successed: false
    }
  },
  methods: {
    addTask(){

      this.$api.post('/store',{
        user_id: this.user_id,
        title: this.title,
        description: this.description,
        status: this.status
      })
      .then(response => {
        this.tasks = response.data
        this.successed = true
        this.loading = true
      })
      .catch(error => {
        console.log(error.response)
        this.errored = true
      })
      .finally(() => this.loading = false)
    }
  },
}
</script>

<style scoped>
    .task-content{
      margin-top: 8em;
      margin-bottom: 1.5em;  
    }
</style>