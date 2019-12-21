<template>
  <div class="container">
    <div class="row">
      <div class="col task-content">
        <router-link :to="{ name : 'add-task'}">
          <button type="button" class="btn btn-primary add-task">Add Task</button>
        </router-link>
        <vue-bootstrap4-table :rows="rows"
                :columns="columns"
                :config="config"
                @on-change-query="onChangeQuery"
                :show-loader="showLoader"
                :totalRows="total_rows">
        </vue-bootstrap4-table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VueBootstrap4Table from 'vue-bootstrap4-table'

export default {
  name: 'task',
  components: {
    VueBootstrap4Table
  },
  data: function() {
    return {
      tasks: null,
      loading: true,
      errored: false,
      data_rows: [],
      data_columns: null,

      rows: [],
      columns: [{
        label: "Title",
        name: "title",
        filter: {
          type: "simple",
          placeholder: "title"
        },
        sort: true,
        },
        {
          label: "Description",
          name: "description",
          filter: {
            type: "simple",
            placeholder: "Enter description"
          },
          sort: true,
        },
        /*{
          label: "Created At",
          name: "created_at",
          sort: true,
        },*/
        {
          label: "Status",
          name: "status",
          filter: {
            type: "simple",
            placeholder: "Enter status"
          },
        }],
        config: {
          checkbox_rows: true,
          rows_selectable: true,
          server_mode: true, // by default false
          loaderText: 'Updating...', // by default 'Loading...'
          card_title: "Liste des tâches"
        },
        queryParams: {
          sort: [],
          filters: [],
          global_search: "",
          per_page: 10,
          page: 1,
        },
        total_rows: 0,
        showLoader: true,
      }
    },
    mounted () {
      this.fetchData();
      /*this.$api
      .get('/task')
      .then(response => {
        this.tasks = response.data
        console.log(response.data)
        this.data_rows = this.getRows(this.tasks)
        console.log("Data rows : ", this.data_rows)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)*/
    },
    methods: {

      onChangeQuery(queryParams) {
        this.queryParams = queryParams;
        this.showLoader = true;
        this.fetchData();
      },
      fetchData() {
        let self = this;
        this.$api.get('/task', {
          params: {
          "queryParams": this.queryParams,
          "page": this.queryParams.page
        }
        })
        .then(function(response) {
          self.rows = response.data;
          self.total_rows = response.data.length;
          self.showLoader = false;
        })
        .catch(function(error) {
          self.showLoader = false;
          console.log(error);
        });
      },
    },
  }
</script>

<style scoped>
    .task-content{

      margin-top: 8em;
      margin-bottom: 1.5em;  
    }
    .add-task{
      margin-bottom: 1em;
    }
</style>