<template>
  <b-card-group deck>
    <div class="col-xl-3 no-putters" v-for="(item, index) in statsCard" v-bind:key="index">
      <b-card class="mb-2" v-show="skele[0]">
        <b-row class="align-items-center">
          <b-col class="col-auto">
            <b-skeleton type="avatar" ></b-skeleton>
          </b-col>
          <b-col class="col">
            <b-skeleton width="65%" v-show="skele[0]"></b-skeleton>
            <b-skeleton width="25%" v-show="skele[0]"></b-skeleton>
          </b-col>
        </b-row>
      </b-card>
      <b-card class="mb-2" :class="item.border" :style="cardStyle(index)" v-show="skele[1]">
        <b-row class="align-items-center">
          <b-col class="col-auto">
            <!-- leaf, water, trophy, shield -->
            <template v-if="index==0 && omica"><BIconCupStraw :class="item.color" font-scale="2"/></template>
            <!-- <template v-if="index==0 && robotics"><font-awesome-icon :class="item.color" icon="fa-solid fa-leaf" /></template> -->
            <template v-else-if="index==1 && omica"><BIconTrophyFill :class="item.color" font-scale="2"/></template>
            <template v-else-if="index==2 && omica"><BIconHourglassSplit :class="item.color" font-scale="2"/></template>
            <template v-else-if="index==3 && omica"><BIconShieldFillCheck :class="item.color" font-scale="2"/></template>
          </b-col>
          <b-col class="col">
            <b-card-title :title="$t('dashboard.'+item.title)"></b-card-title>
            <b-card-text v-if="item.value == 'No data'" class="text-dark">
              {{$t('dashboard.'+item.value)}}
            </b-card-text>
            <b-card-text v-else class="text-dark">
              {{item.value}}
            </b-card-text>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </b-card-group>
</template>

<script>
import store from '../../store/store'
import { BIconCupStraw,BIconTrophyFill,BIconHourglassSplit,BIconShieldFillCheck } from 'bootstrap-vue'
export default {
  name:'cards',
  components: {
    BIconCupStraw,
    BIconTrophyFill,
    BIconHourglassSplit,
    BIconShieldFillCheck
  },
  props:{
    showSke: {type: Boolean },
		showStats: {type: Boolean },
    madeVal: { type: String },
    topVal: { type: String },
    hrVal: { type: String },
    healthVal: { type: String },
    omica: {type: Boolean},
    robotics: {type: Boolean}
  },
  computed:{
    'skele':function(){
      return [this.showSke,this.showStats]
    },
    'statsCard':function(){
      var [stats1,stats2] = [[],[]];
      if(this.omica){
        stats1 =[{
          title: 'drinks made',
          value: this.madeVal,
          border: 'border-left-secondary',
          icon: 'cup-straw',
          color: 'text-secondary'
        },{
          title: 'top1',
          value: this.topVal,
          border: 'border-left-info',
          icon: 'trophy-fill',
          color: 'text-info'
        },{
          title: 'peak hr',
          value: this.hrVal,
          border: 'border-left-primary',
          icon: 'hourglass-split',
          color: 'text-primary'
        },{
          title: 'machine h',
          value: this.healthVal,
          border: 'border-left-success',
          icon: 'shield-fill-check',
          color: 'text-success'
        }]
      }else if(this.robotics){
        stats2 = [{
          title: 'tea cooked',
          value: '',//store.getters.getStats.madeVal,
          border: 'border-left-secondary',
          icon: 'leaf',//'cup-straw',
          color: 'text-secondary'
        },{
          title: 'water used',
          value: '',//store.getters.getStats.hrVal,
          border: 'border-left-primary',
          icon: 'water',//'hourglass-split',
          color: 'text-primary'
        },{
          title: 'top1',
          value: '',//store.getters.getStats.topVal,
          border: 'border-left-info',
          icon: 'trophy-fill',
          color: 'text-info'
        },{
          title: 'machine h',
          value: '',//store.getters.getStats.healthVal,
          border: 'border-left-success',
          icon: 'shield-fill-check',
          color: 'text-success'
        }]
      }
      //return [stats1, stats2]
      return [{
        title: 'drinks made',
        value: store.getters.getStats.madeVal,
        border: 'border-left-secondary',
        icon: 'cup-straw',
        color: 'text-secondary'
      },{
        title: 'top1',
        value: store.getters.getStats.topVal,
        border: 'border-left-info',
        icon: 'trophy-fill',
        color: 'text-info'
      },{
        title: 'peak hr',
        value: store.getters.getStats.hrVal,
        border: 'border-left-primary',
        icon: 'hourglass-split',
        color: 'text-primary'
      },{
        title: 'machine h',
        value: store.getters.getStats.healthVal,
        border: 'border-left-success',
        icon: 'shield-fill-check',
        color: 'text-success'
      }]
    }
  },
  methods:{
    cardStyle(i){
      var style = {};
      if(i === 1 || i === 2){style.margin = '0 6px'}
      else if(i === 0){style.margin = '0 6px 0 0'}
      else{style.margin = '0 0 0 6px'}
      return style
    }
  }
}
</script>>

<style scoped>
@media (min-width: 576px){
	.card-deck{
		display: flex;
    flex-flow: row wrap;
	}
	.card{
		max-width: 100%;
	}
}
@media (max-width: 576px){	
	.card{
		margin: 10px 0 !important;
	}
}
.fourCards{
	width: fit-content;
}
.card{
	position: relative;
	display: flex;
	flex-direction: column;
	min-width: 0;
	word-wrap: break-word;
	background-color: #fff;
	background-clip: border-box;
	border: 1px solid #e3e6f0;
	border-radius: 0.35rem;
	box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
}
.card-title{
	font-size: .7rem !important;
  font-weight: bold;
}
</style>