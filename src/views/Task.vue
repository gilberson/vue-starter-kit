<template>
  <div class="container">
    <div class="row">
      <div class="col task-content">
        <router-link :to="{ name : 'add-task'}">
          <button type="button" class="btn btn-primary add-task">Add Task</button>
        </router-link>
        <button v-if="selected.length > 0" v-on:click="deleteTask(selected)" type="button" class="btn btn-danger delete-task">Delete selected item(s)</button>
        <router-link v-if="selected.length == 1 " :to="{ name : 'view-task', params: { id: parseInt(selected[0].id) }}">
          <button type="button" class="btn btn-primary delete-task">Show the selected item</button>
        </router-link>

        <b-col sm="5" md="6" class="my-1">
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-col>
        <b-table 
          class="mt-4" 
          outlined
          hover 
          :items="items" 
          :fields="fields"
          show-empty
          small
          stacked="md"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filterIncludedFields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
          ref="selectableTable"
          selectable
          :select-mode="selectMode"
          @row-selected="onRowSelected"
          responsive="sm"
          >
          </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>

        <div v-if="selected.length > 0" class="selected-rows">
          Selected Rows:<br>
          {{ selected }}
        </div>
        
        <div v-if="deleted" class="alert alert-info" role="alert">
          Deleted task(s):
          <ul class="list" v-for="(task, index) in deleted_tasks" :key="index">
            <li>{{ task }}</li>
          </ul>
         </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'task',
  components: {
    
  },
  data: function() {
    return {
      tasks: null,
      loading: true,
      errored: false,
      deleted: false,
      deleted_tasks: [],
      modes: ['multi', 'single', 'range'],
      fields: [
        {
          key: 'title',
          sortable: true
        },
        {
          key: 'description',
          sortable: false
        },
        {
          key: 'status',
          // label: 'Person age',
          sortable: true,
          // Variant applies to the whole column, including the header and footer
          // variant: 'danger'
        }
      ],
      items: null,
      selectMode: 'multi',
      selected: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted () {
    this.$api
    .get('/task')
    .then(response => {
      this.tasks = response.data
      this.items = this.getItems(response.data)
      this.totalRows = response.data.length
    })
    .catch(error => {
      console.log(error)
      this.errored = true
    })
    .finally(() => this.loading = false)
  },
  methods: {

    getItems(tasks){

      let items = [];
      for(var i = 0; i < tasks.length; i++){

        items[i] = { 
          id: tasks[i].id,
          user_id: tasks[i].user_id,
          title: tasks[i].title,
          description: tasks[i].description,
          created_at: tasks[i].created_at,
          status: tasks[i].status == 0 ? 'Désactivé' : 'Activé'
        };
      }
      return items;
    },
    showTask(){

    },
    deleteTask(selectedItems){
      var i = 0;
      selectedItems.forEach(element => {
        
        this.deleted_tasks[i] = element.title
        this.$api.post('/delete/' + element.id)
        .then(response => {
          this.tasks = response.data
          this.deleted = true
          this.$root.$emit('bv::refresh::table', 'selectableTable')
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        i +=1
      });
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    onRowSelected(items) {
      this.selected = items
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows()
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected()
    },
    selectThirdRow() {
      // Rows are indexed from 0, so the third row is index 2
      this.$refs.selectableTable.selectRow(2)
    },
    unselectThirdRow() {
      // Rows are indexed from 0, so the third row is index 2
      this.$refs.selectableTable.unselectRow(2)
    }
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

    .delete-task{
      margin-left: 1.5em;
      margin-top: -0.82em;
    }

    .selected-rows{

      margin-top: 1.5em;
      border: 1px dotted #333333;
      padding: 0.8em;
    }
</style>