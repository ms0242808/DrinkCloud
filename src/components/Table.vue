<template>
  <div>
    <b-table responsive hover :items="val" :sticky-header="stickyHeader" > <!--:fields="fields"-->
      <!-- <template  #cell(Ice)="val">
        <b-form-input  :value="val.item.Ice" class="editInput" />
      </template> -->
      <!-- <template v-slot:cell()="{ item, field: { key }}">
        <b-form-input  :value="item[key]" class="editInput" />
      </template> -->
    </b-table>
  </div>
</template>
// https://stackoverflow.com/questions/64629051/edit-row-in-vuejs-and-bootstrap-vue
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
}
.l-40{
  left:46px !important;
}
</style>
{  "item": {    
  "Size": "L",    "Temperature": 0,    "Topping": 0,    "Ice": 200,    "sugar100": 10,    "sugar70": 0,    "sugar50": 0,    "sugar30": 0,    "牛奶": 60,    "milk2": 0,    
  "紅茶": 140,    "烏龍茶": 0,    "冬瓜茶": 0,    "青茶": 0,    "金萱": 0,    "綠茶": 0,    "古早紅": 0,    "普洱": 0,    "桂花": 0,    "茉莉": 0,    
  "檸檬汁": 0,    "芒果汁": 0,    "梅汁": 0,    "荔汁": 0,    "甘蔗汁": 0,    "養樂多": 0,    "鳳梨汁": 0,    "百香汁": 0,    
  "coldwater": 0,    "hotwater": 0,    "shake": 1,    "supplycode": 2  },
    "index": 0,  
    "field": {    "key": "Size",    "label": "Size"  },  "unformatted": "L",  "value": "L",  "detailsShowing": false,  "rowSelected": false}