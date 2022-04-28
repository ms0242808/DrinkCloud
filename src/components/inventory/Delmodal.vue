<template>
  <b-modal ref="delModal" id="delModal" :title="$t('inv.delete')" @hide="hideModal('delModal')" centered> 
    <p class="text-dark"><b>{{$t('inv.del_msg')}}</b></p>
    <b-checkbox v-model="check" class="text-dark"><b>{{$t('inv.del_check')}}</b></b-checkbox>
    <template #modal-footer>
      <div class="w-100">
        <b-button variant="danger" class="float-right ml-1 text-14" @click="delItem(data)" :disabled="btnState == 1"><b>{{$t('inv.delete')}}</b></b-button>
        <b-button variant="outline-dark text-14" class="float-right" @click="hideModal('delModal')">{{$t('inv.cancel')}}</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import store from '../../store/store'
import { arrayUnion, db, doc, updateDoc, deleteField, perf, trace} from "../../fire"

export default {
  name:'del_modal',
  data(){
    return{
      brandL: store.getters.getLocation,
      check:false
    }
  },
  props:{
    data: {type:Object}
  },
  computed:{
    'btnState':function(){
      if(this.check){return 0}
      else{return 1}
    }
  },
  methods:{
    hideModal(id){
      this.$bvModal.hide(id);
      this.check = false;
    },
    async delItem(data){
      const t = trace(perf,"delInventory");
			t.start();
      const newData = doc(db, "inventory", this.brandL);
      var x = 0,
      val = data.item.selected,
      newVal = data.item.d;
      for(x in data.item.selected){
        var n = parseInt(val[x].split('@'));
        newVal.splice(n,1);
      }
      if(newVal.length>0){
        await updateDoc(newData,{
          [data.item.id]:{
            ['data']:arrayUnion(...newVal),
            ['tele']:data.item.Company_tele
          }
        },{merge:true});
      }else{
        await updateDoc(newData,{
          [data.item.id]:deleteField()
        });
      }
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
