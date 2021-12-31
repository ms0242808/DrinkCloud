<template>
  <b-card-group deck>
    <div :class="item.class" class="no-putters" v-for="(item, index) in statsChart" v-bind:key="index" >
      <b-card v-show="skele[0]">
        <b-card-title>
          <b-skeleton width="50%"/>
        </b-card-title>
        <b-card-text>
          <b-skeleton height="150px" />
        </b-card-text>
      </b-card>
      <b-card bg-variant="light" :header="$t('dashboard.'+item.title)" :style="chartStyle(index)" v-show="skele[1]" class="text-dark text-bold mt-2">
        <b-card-text>
          <apexchart :height="item.height" width="100%" :type="item.type" :options="item.options" :series="item.series"></apexchart>
        </b-card-text>
      </b-card>
    </div>
  </b-card-group>
</template>

<script>
import store from '../../store/store'
export default {
  name:'charts',
  props: {
    showSke: {type: Boolean },
		showStats: {type: Boolean },
    overviewVal: { type: Array },
    tpieVal: { type: Array },
    tpieLab: { type: Array },
    jpieVal: { type: Array },
    jpieLab: { type: Array },
    sradarVal1: {type: Array},
    sradarVal2: {type: Array},
    iradarVal1: {type: Array},
    iradarVal2: {type: Array},
    ipieVal: { type: Array },
    ipieLab: { type: Array }
  },
  computed:{
    'skele': function(){
      return [this.showSke,this.showStats]
    },
    'statsChart': function(){
      var nodata = {
        text: this.$i18n.t('dashboard.no data'),
        align: "center",
        verticalAlign: "middle",
        style:{
          fontSize: '14px'
        }
      };
      return [{
        title: 'overview',
        type: 'line',
        class:"col-xl-7 mt-2",
        options: {
          noData: nodata,
          chart: {
            id: 'overviewLine',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            },
          },
          xaxis: {
            categories: store.getters.getStats.overviewLab
          }
        },
        series: [{
          name: this.$i18n.t('dashboard.Cups'),
          data: store.getters.getStats.overviewVal
        }]
      },{
        title: 'tea usage',
        type:'donut',
        class:"col-xl-5 mt-2",
        options: {
          labels: store.getters.getStats.tpieLab,
          noData: nodata
        },
        series: store.getters.getStats.tpieVal
      },{
        title: 'juice usage',
        type:'donut',
        class:"col-xl-5 mt-2",
        options: {
          labels: store.getters.getStats.jpieLab,
          noData: nodata
        },
        series: store.getters.getStats.jpieVal
      },{
        title: 'sugar custom',
        type:'radar',
        class:"col-xl-7 mt-2",
        height:"300",
        series: [{
          name: this.$i18n.t("recipe.L"),
          data: store.getters.getStats.sradarVal1
        },{
          name: this.$i18n.t("recipe.M"),
          data: store.getters.getStats.sradarVal2
        }],
        options:{
          labels: ['100%','70%','50%','30%','0%'],
          noData: nodata
        }
      },{
        title: 'ice custom',
        type:'radar',
        class:"col-xl-7 mt-2",
        height:"300",
        series: [{
          name: this.$i18n.t("recipe.L"),
          data: store.getters.getStats.iradarVal1
        },{
          name: this.$i18n.t("recipe.M"),
          data: store.getters.getStats.iradarVal2
        }],
        options:{
          labels: [this.$i18n.t('recipe.Normal Ice'),this.$i18n.t('recipe.Less Ice'),this.$i18n.t('recipe.Ice Free'),this.$i18n.t('recipe.Warm'),this.$i18n.t('recipe.Hot')],
          noData: nodata
        }
      },{
        title: 'ice options',
        type:'donut',
        class:"col-xl-5 mt-2",
        options: {
          labels: store.getters.getStats.ipieLab.map((key) => {return this.$i18n.t('recipe.'+key)}),
          noData: nodata
        },
        series: store.getters.getStats.ipieVal
      }]
    }
  },
  methods:{
    chartStyle(i){
      var style = {};
      if(i === 0 || i % 2 == 0){style.margin = '0 12px 0 0'}
      else{style.margin = '0 0 0 12px'}
      return style
    }
  }
}
</script>

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
.col-xl-3{
	flex: 0 0 25%;
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
}
</style>