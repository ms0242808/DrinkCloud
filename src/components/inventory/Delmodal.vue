<template>
  <b-modal ref="delModal" id="delModal" :title="$t('inv.delete')" @hide="hideModal('delModal')" centered> 
    <a><b>Are you sure you want to delete this record?</b></a>
    <template #modal-footer>
      <div class="w-100">
        <b-button variant="outline-danger" class="float-right ml-1 text-14" @click="delItem(data)" :disabled="btnState == 0">{{$t('inv.delete')}}</b-button>
        <b-button variant="outline-dark text-14" class="float-right" @click="hideModal('delModal')">{{$t('inv.cancel')}}</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import store from '../../store/store'
import { arrayUnion, db, doc, updateDoc, perf, trace} from "../../fire"

export default {
  name:'del_modal',
  data(){
    return{
      brandL: store.getters.getLocation,
      catVal:'',
      itemVal:'',
      companyVal:'',
      teleVal:'',
      dateVal:'',
      timeVal:'',
      quantityVal:'',
      unitVal:'',
      priceVal:'',
    }
  },
  props:{
    data: {type:Object},
    catList: {type: Array},
    companyList: {type: Array},
    unitList: {type: Array}
  },
  computed:{
    'btnState':function(){
      if(this.catVal.length > 0 && this.itemVal.length > 0 && this.companyVal.length > 0 && this.teleVal.length > 0 && this.dateVal.length > 0 && this.timeVal.length > 0 && this.quantityVal.length > 0 && this.unitVal.length > 0 && this.priceVal.length > 0){return 0}
      else{return 1}
    }
  },
  methods:{
    hideModal(id){
      this.$bvModal.hide(id);
    },
    async delItem(data){
      const t = trace(perf,"delInventory");
			t.start();
      const newData = doc(db, "inventory", this.brandL);
      var x = 0,
      y =  0,
      [a,b,c] = [[],[],[]],
      val = data.item.details,
      sel = '';
      for(x in data.item.selected){
        var v = parseInt(data.item.selected[x].split('_')[0]);
        sel = (x>0 && v>0) ? v-3 :v;
        val.splice(sel,3);
      }
      for(y; y<val.length; y+=3){
        a.push(val[y]);
        b.push(val[y+1]);
        c.push(val[y+2]);
      }
      await updateDoc(newData,{
        [data.item.id]:{
          ['added']:arrayUnion(...c),
          ['price']:arrayUnion(...b),
          ['quantity']:arrayUnion(...a),
          ['tele']:data.item.Company_tele
        }
      },{merge:true});
      this.hideModal('delModal');
      t.stop();
    }
  }
}
</script>

<style scoped>
.spcae{
  white-space: pre-line;
}
a{
  color:initial;
}
.text-14{
  font-size: 14px;
}
</style>
