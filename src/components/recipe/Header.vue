<template>
  <div>
    <b-col class="no-putters" cols="4">
      <b-button-group class="float-right">
        <b-skeleton width="80px" height="30px"></b-skeleton>
        <b-skeleton width="80px" height="30px"></b-skeleton>
      </b-button-group>
      <b-button-group class="float-right" v-show="skele[0]">
        <b-button variant="success">Add</b-button>
        <b-button variant="info">Publish</b-button>
      </b-button-group>
    </b-col>
    <b-col class="no-putters" cols="8">
      <b-skeleton width="70%" height="30px" v-show="skele[0]"></b-skeleton>
    </b-col>
    <b-col class="no-putters" cols="4">
      <b-button-group class="float-right" v-show="skele[0]">
        <b-skeleton width="60px" height="30px"></b-skeleton>
        <b-skeleton width="60px" height="30px"></b-skeleton>
      </b-button-group>
      <b-button-group class="float-right" v-show="skele[1]">
        <b-button variant="success">Manage</b-button>
        <b-button variant="info">Setting</b-button>
      </b-button-group>
    </b-col>
  </div>
</template>

<script>
import store from '../../store/store'
export default {
  name:'header',
  props: {
    showSke: {type: Boolean },
    showVal: {type: Boolean },
    recipes: {type:Array}
  },
  computed:{
    'skele': function(){
      return [this.showSke,this.showVal]
    },
  },
  // methods:{
  //   cardStyle(i){
  //     var style = {};
  //     if(i === 1 || i === 2){style.margin = '0 6px'}
  //     else if(i === 0){style.margin = '0 6px 0 0'}
  //     else{style.margin = '0 0 0 6px'}
  //     return style
  //   }
  // }
}
</script>>

<style scoped>

</style>
