<template>
  <div class="container">
    <div class="row">
      <div class="col task-content">
        <section v-if="errored">
          <div class="alert alert-danger" role="alert">
            The task has not been created
          </div>
        </section>

        <section v-if="successed">
          <div class="alert alert-success" role="alert">
            The task has been created
          </div>
        </section>

        <h1>Add a new task</h1>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(addTask)">
              <div class="form-group">
                  <label for="title">Task name</label>
                  <validation-provider rules="required" v-slot="{ errors }">
                      <input type="text" v-model="title" name="title" class="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter a title"/>
                      <span>{{ errors[0] }}</span>
                  </validation-provider>
              </div>
              <div class="form-group">
                  <label for="description">Description</label>
                  <validation-provider rules="required" v-slot="{ errors }">
                      <textarea v-model="description" class="form-control" id="description" rows="5" placeholder="Enter the description"></textarea>
                      <span>{{ errors[0] }}</span>
                  </validation-provider>
              </div>

              <div class="form-group">
                  <label for="status">User</label>
                  <validation-provider rules="required" v-slot="{ errors }">
                      <select v-model="user_id" class="form-control" id="user_id">
                        <option value="" disabled selected>Select the user</option>
                        <option v-for="(user, index) in users" :key="index" :value="user.id">{{ user.name }}</option>
                      </select>
                      <span>{{ errors[0] }}</span>
                  </validation-provider>
              </div>

              <div class="form-group">
                  <label for="status">Status</label>
                  <validation-provider rules="required" v-slot="{ errors }">
                      <select v-model="status" class="form-control" id="status">
                        <option value="" disabled selected>Select the status</option>
                        <option value="1">Activé</option>
                        <option value="0">Désactivé</option>
                      </select>
                      <span>{{ errors[0] }}</span>
                  </validation-provider>
              </div>
              <button type="submit" class="btn btn-primary">Add</button>
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
      user_id: '',
      title: '',
      description: '',
      status: '',
      tasks: null,
      errored: false,
      successed: false,
      users: null
    }
  },
  mounted(){
    this.$api.get('/users')
    .then(response => {
      this.users = response.data.users
    })
    .catch(error => {
      console.log(error.response)
    })
  },
  methods: {
    addTask(){

      this.$api.post('/tasks',{
        user_id: parseInt(this.user_id),
        title: this.title,
        description: this.description,
        status: this.status
      })
      .then(response => {
        this.tasks = response.data
        this.successed = true
        this.loading = true

        // Reset the form
        let form = document.querySelector('form');
        form.reset();
      })
      .catch(error => {
        console.log(error.response)
        this.errored = true
      })
    },
  },
}
</script>

<style scoped>
    .task-content{
      margin-top: 8em;
      margin-bottom: 1.5em;  
    }
</style>