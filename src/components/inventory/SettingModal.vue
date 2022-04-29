<template>
  <b-modal ref="setModal" id="setModal" :title="$t('inv.setting')" @hide="hideModal('setModal')" centered> 
    <b-row>
      <b-col cols="6" class="mt-2">
        <a class="space text-bold">{{$t('inv.item')}}</a>
      </b-col>
      <b-col cols="6" class="mt-2">
        <a class="space text-bold">{{$t('inv.produce')}}</a>
      </b-col>
      <template v-for="(item,n) in data">
        <b-col cols="6" class="mt-2" :key="n+'L'+item">
          <a class="space">{{item.Category}} : </a>
          <a class="space">{{item.Name}}({{item.Company_name}})/</a>
          <a class="space">{{item.Unit}}</a>
        </b-col>
        <b-col cols="6" class="mt-2 d-flex" :key="n+'R'+item">
          <b-form-input v-model="item.produce" id="invPrice" type="number" :disabled="item.produce==0 && item.produce!==''"></b-form-input>
          <b-checkbox v-model="item.produce" value='0' :unchecked-value="(item.ogVal===0)?'':item.ogVal" class="mx-2 text-dark"> {{$t('inv.exclude')}} </b-checkbox>
        </b-col>
      </template>
    </b-row>
    <template #modal-footer>
      <div class="w-100">
        <b-button variant="outline-success" class="float-right ml-1 text-14 text-bold" @click="saveSet()" :disabled="btnState == 1">{{$t('inv.save')}}</b-button>
        <b-button variant="outline-dark text-14" class="float-right" @click="hideModal('setModal')">{{$t('inv.cancel')}}</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import store from '../../store/store'
import { arrayUnion, db, doc,writeBatch, perf, trace} from "../../fire"

export default {
  name:'set_modal',
  data(){
    return{
      brandL: store.getters.getLocation
    }
  },
  props:{
    data: {type:Array}
  },
  computed:{
    'btnState':function(){
      var x = 0,y=[];
      for(x in this.data){if(this.data[x].produce !== this.data[x].ogVal){y.push(0)}else{y.push(1)}}
      return (y.includes(0))?0:1
    }
  },
  methods:{
    hideModal(id){
      this.$bvModal.hide(id);
      var x = 0;
      for(x in this.data){this.data[x].produce = this.data[x].ogVal}
    },
    async saveSet(){
      const t = trace(perf,"saveInvSet");
      t.start();
      const batch = writeBatch(db);
      const newData = doc(db, "inventory", this.brandL);
      var a = 0;
      for(a in this.data){
        await batch.update(newData,{
          [this.data[a].id]:{
            ['data']:arrayUnion(...JSON.parse(JSON.stringify(this.data[a].d))),
            ['tele']:this.data[a].Company_tele,
            ['produce']:parseInt(this.data[a].produce)
          }
        },{merge:true})
      }
      await batch.commit();
      this.hideModal('setModal');
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
