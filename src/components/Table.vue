<template>
  <div>
    <b-table responsive hover :items="val" :sticky-header="stickyHeader" :fields="fields"> <!--:fields="fields"-->
      <!-- <template  #cell(Ice)="val">
        <b-form-input  :value="val.item.Ice" class="editInput" />
        https://stackoverflow.com/questions/64629051/edit-row-in-vuejs-and-bootstrap-vue
      </template> -->
      <template v-slot:cell()="{ item, field: { key }}">
        <b-form-input v-model="item[key]" :value="item[key]" class="editInput"  v-if="key !== 'Size' && key !== 'Topping'"/>
        <label v-else>{{item[key]}}</label>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    props: {
      showSke: {type: Boolean },
      showVal: {type: Boolean },
      nodata: {type: Boolean },
      val: {type: Array },
      stickyHeader: {type: Boolean },
      fields: {type: Array }
    },
    data() {
      return {
        
      }
    }
  }
</script>
<style>
.editInput{
  width: 100px !important;
  border: none;
}
.l-54{
  left: 54px !important;
}
.table th{
  border-top: none;
}
</style>