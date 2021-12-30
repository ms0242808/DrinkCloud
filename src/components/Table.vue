<template>
  <div>
    <b-table responsive hover :items="val" :sticky-header="stickyHeader" :fields="fields"> <!--:fields="fields"-->
      <!-- <template  #cell(Ice)="val">
        <b-form-input  :value="val.item.Ice" class="editInput" />
        https://stackoverflow.com/questions/64629051/edit-row-in-vuejs-and-bootstrap-vue
      </template> -->
      <template v-slot:cell()="{ item, field: { key }}">
        <b-form-input v-model="item[key]" :value="item[key]" class="editInput" type="number" v-if="key !== 'Size' && key !== 'Topping'"/>
        <label v-else-if="key == 'Size'" class="wt-100">{{$t('recipe.'+item[key])}}</label>
        <label v-else class="wt-100">{{item[key]}}</label>
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
        isBusy: false,
      }
    }
  }
</script>
<style>
.editInput{
  width: 100px !important;
  border: none;
}
.l-93{
  left: 93px !important;
}
.table th{
  border-top: none;
}
.wt-100{
  padding: 6px;
  width: 70px !important;
}
.nav-link.active{
  color:white !important;
}
.nav-pills .nav-link,.nav-link {
  color:initial;
}
</style>