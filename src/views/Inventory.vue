<template>
  <div class="wrapper">
    <h3>{{$t('inv.title')}}</h3>
    <div class="mt-3">
      <b-row>
        <b-col sm="12" lg="6">
          <b-button-group>
            <b-button variant="success">Add</b-button>
            <b-button variant="warning">Delete</b-button>
          </b-button-group>
        </b-col>
        <b-col sm="12" lg="6">
          <b-form-group label="Filter" label-for="filter-input" label-cols-sm="3" label-align-sm="right" label-size="sm" class="mb-0">
            <b-input-group size="sm">
              <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Type to Search"></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-button variant="success">Export</b-button>
        </b-col>
      </b-row>
      <b-table striped hover responsive :items="items" :fields="fields" :filter="filter">

      </b-table>
    </div>
  </div>
  <!--
    https://www.mimo.work/help/category/consumables
    https://www.behance.net/gallery/55390583/Inventory-management-dashboard
    display by table, like permission page
    新增耗材分類 -> modal with text input & submit button
    新增耗材(名稱) -> modal with text inputs (brand and product name) & submit button
    添加庫存 -> modal with select input, text input, date, time & save button
    剩餘庫存, 警示 -> display on card
    刪除耗材或分類 -> modal with warning text & delete button
    變更耗材分類名稱或耗材名稱 -> modal with text input & update button
  -->
</template>

<script>
import store from '../store/store'
import { mapGetters } from 'vuex'

export default {
  name: 'Inventory',
  data(){
    return{
      items:[],
      filter: null
    }
  },
  computed:{
    ...mapGetters([
      'getLocation',
      'getLocationList'
    ]),
    'fields':function(){
      return [
        // {"key":"Category",label:this.$i18n.t('inv.name')},
        // {"key":"Name",label:this.$i18n.t('inv.name')},
        // {"key":"Available",label:this.$i18n.t('inv.role')},
        // {"key":"Used",label:this.$i18n.t('inv.locations')},
        // {"key":"Comapny name",label:this.$i18n.t('inv.action')}
        // {"key":"Last added",label:this.$i18n.t('inv.action')}
        // {"key":"Action",label:this.$i18n.t('inv.action')}
      ]
    }
  },
  methods:{

  },
  watch:{
    getLocation(val){
      this.brandL = val;
      // this.loadTable();
    }
  },
  mounted(){
    // this.getStaff();
    // if(this.brandL == '-'){
    //   this.brandL = this.getLocation;
    //   this.getStaff();
    // }
  }
}
</script>

<style scoped>

</style>
