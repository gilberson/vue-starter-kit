<template>
    <div class="container">
        <div class="row">
            <div class="col users">
                <h1>USERS</h1>
                <router-link class="user-detail" v-if="selected.length == 1 " :to="{ name : 'view-user', params: { id: parseInt(selected[0].id) }}">
                    <button type="button" class="btn btn-primary">Show the selected User</button>
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
            users: null,
            loading: true,
            errored: false,
            fields: [
                {
                    key: 'name',
                    sortable: true
                },
                {
                    key: 'email',
                    sortable: false
                },
                {
                    key: 'created_at',
                    sortable: true,
                }
            ],
            items: null,
            selectMode: 'single',
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
        this.$api.get('/users')
        .then(response => {
            this.users = response.data
            this.items = this.getItems(response.data.users)
            this.totalRows = response.data.users.length
        })
        .catch(error => {
            console.log(error)
            this.errored = true
        })
        .finally(() => this.loading = false)
    },
    methods: {
        getItems(users){
            let items = [];
            for(var i = 0; i < users.length; i++){
                items[i] = { 
                    id: users[i].id,
                    name: users[i].name,
                    email: users[i].email,
                    created_at: users[i].created_at
                };
            }   
            return items;
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
        clearSelected() {
            this.$refs.selectableTable.clearSelected()
        },
    }
}
</script>

<style scoped>
    .users{

        /*border: 1px dotted gray;*/
        margin-top: 6.5em;
        min-height: 350px;
        padding-top: 1em;
        padding-bottom: 1.5em;
    }
    .card-task{

        margin-top: 3.5em;
    }

    .user-detail{

        float: right;
    }
</style>