<template>
  <div class="container">
    <div class="row">
      <div class="col task-content">
        <section v-if="errored">
          <div class="alert alert-danger" role="alert">
            The task has not been updated
          </div>
        </section>

        <section v-if="successed">
          <div class="alert alert-success" role="alert">
            The task has been updated
          </div>
        </section>

        <h1>Update the task</h1>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(updateTask)">
              <div class="form-group">
                  <label for="title">Task name</label>
                  <validation-provider rules="required" v-slot="{ errors }">
                      <input type="text"  v-model="task.title" name="title" class="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter a title"/>
                      <span>{{ errors[0] }}</span>
                  </validation-provider>
              </div>
              <div class="form-group">
                  <label for="description">Description</label>
                  <validation-provider rules="required" v-slot="{ errors }">
                      <textarea v-model="task.description" class="form-control" id="description" rows="5" placeholder="Enter the description"></textarea>
                      <span>{{ errors[0] }}</span>
                  </validation-provider>
              </div>

              <div class="form-group">
                  <label for="status">Status</label>
                  <validation-provider rules="required" v-slot="{ errors }">
                      <select v-model="task.status" class="form-control" id="status">
                        <option value="" disabled selected>Select the status</option>
                        <option value="1">Activé</option>
                        <option value="0">Désactivé</option>
                      </select>
                      <span>{{ errors[0] }}</span>
                  </validation-provider>
              </div>

              <button type="submit" class="btn btn-primary">Update</button>
          </form>
        </ValidationObserver>
      </div>
    </div><!-- end row -->
  </div>
</template>

<script>
// @ is an alias to /src
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  name: 'home',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: function(){

    return {
      title: '',
      description: '',
      status: '',
      task: null,
      updated_task: null,
      errored: false,
      successed: false
    }
  },
  mounted () {
    let id = this.$route.params.id  
    this.getTask(id)
  },
  methods: {
    updateTask(){
      this.$api.post('/update/' + this.$route.params.id,{
        title: this.task.title,
        description: this.task.description,
        status: this.task.status
      })
      .then(response => {
        this.updated_task = response.data
        this.successed = true
        console.log("Updated task : " + response.data)
        // Reset the form
        //let form = document.querySelector('form');
        //form.reset();
      })
      .catch(error => {
        console.log(error.response)
        this.errored = true

        if(error.response.status === 404){    
          // redirect user to an error page  
          this.$router.push('/page-not-found')
        }
      })
    },
    getTask(id){
      this.$api.get('/tasks/' + id)
      .then(response => {
        this.task = response.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
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