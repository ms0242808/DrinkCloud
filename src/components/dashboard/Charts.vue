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
        <template #header>
          <b-row>
            <b-col cols="6">{{$t('dashboard.'+item.title)}}</b-col>
            <b-col cols="6">
              <b-button variant="transparent" v-if="index==0 && item.dataL>0" class="float-right text-dark no-pad" @click="$router.push('/dashboard/stats/'+dateRange)"><font-awesome-icon fixed-width icon="eye"/></b-button>              
              <b-button v-else-if="index>0" class="float-right no-pad" variant="transparent" @click="toggleView(index)"><font-awesome-icon fixed-width icon="chart-pie" v-show="switchV[index-1]"/><font-awesome-icon fixed-width icon="list-ol" v-show="!switchV[index-1]"/></b-button>
            </b-col> 
          </b-row>
        </template>
        <b-card-text>
          <apexchart v-if="index==0" :height="item.height" width="100%" :type="item.type" :options="item.options" :series="item.series"></apexchart>
          <template v-else>
            <apexchart :height="item.height" width="100%" :type="item.type" :options="item.options" :series="item.series" v-show="switchV[index-1]"></apexchart>
            <div v-show="!switchV[index-1]">
              <template v-if="item.dataL==0">
                <div class="divnoData">{{$t('dashboard.no data')}}</div>
              </template>
              <template v-else>
                <template v-if="item.type=='radar'">
                  <b-row>
                    <template v-for="(sval,sindex) in item.series">
                      <b-col cols="6" :key="sindex">
                        <div class="text-center">{{item.series[sindex].name}}</div>
                        <template v-for="sitem,si in item.series[sindex].data">
                          <b-row :key="si" class="mt-2">
                            <b-col cols="6" >
                              <a>{{item.options.labels[si]}}</a>
                            </b-col>
                            <b-col cols="6" >
                              <a class="float-right text-dark" >{{sitem}}</a>
                            </b-col>
                          </b-row>
                        </template>
                        <hr>
                        <a>{{$t('dashboard.Total')}}</a>
                        <a class="float-right text-dark">{{item.series[sindex].sum}}</a>
                      </b-col>
                    </template>
                  </b-row>
                </template>
                <template v-else>
                  <b-row>
                    <template v-for="(lab,lindex) in item.options.labels">
                      <b-col cols="6" :key="lindex">
                        <a class="mt-1 text-dark">{{lab}}</a>
                      </b-col>
                      <b-col cols="6" :key="'a'+lindex">
                        <a class="float-right text-dark mt-1">{{item.series[lindex]}}</a>
                      </b-col>
                    </template>
                    <b-col cols="12"><hr></b-col>
                    <b-col cols="6">
                      <a>{{$t('dashboard.Total')}}</a>
                    </b-col>
                    <b-col cols="6">
                      <a class="float-right text-dark">{{item.sum}}</a>
                    </b-col>
                  </b-row>
                </template>
              </template>
            </div>
          </template>
        </b-card-text>
      </b-card>
    </div>
  </b-card-group>
</template>

<script>
import store from '../../store/store'
import VueApexCharts from 'vue-apexcharts'
import Vue from 'vue'

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
export default {
  name:'charts',
  props:{
    showSke: {type: Boolean},
    rangeVal: {type:Array},
		showStats: {type: Boolean},
    overviewVal: {type: Array},
    overviewLab: {type: Array},
    tpieVal: {type: Array},
    tpieLab: {type: Array},
    jpieVal: {type: Array},
    jpieLab: {type: Array},
    sradarVal1: {type: Array},
    sradarVal2: {type: Array},
    iradarVal1: {type: Array},
    iradarVal2: {type: Array},
    ipieVal: {type: Array},
    ipieLab: {type: Array},
    omica: {type: Boolean},
    robotics: {type: Boolean},
    cookoverviewVal : { type: Array },
    cookoverviewLab : { type: Array },
    cookpieVal : { type: Array },
    cookpieLab : { type: Array }
  },
  data(){
    return {
      switchV:[true,true,true,true,true]
    }
  },
  computed:{
    'skele':function(){
      return [this.showSke,this.showStats]
    },
    'dateRange':function(){
      return this.rangeVal[0]+"-"+this.rangeVal[1]
    },
    'statsChart':function(){
      var nodata = {
        text: this.$i18n.t('dashboard.no data'),
        align: "center",
        verticalAlign: "middle",
        style:{
          fontSize: '14px'
        }
      };
      var stats = [];
      if(this.omica){
        stats = [{
          title: 'overview',
          type: 'area',
          class:"col-xl-7 mt-2",
          dataL: store.getters.getStats.overviewVal.length,
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
          dataL: store.getters.getStats.tpieVal.length,
          sum: store.getters.getStats.tpieVal.reduce((a, b) => a + b, 0),
          options: {
            labels: store.getters.getStats.tpieLab,
            noData: nodata,
            chart: {
              toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {download: true},
                export: {
                  csv: {
                    filename: 'Tea',
                    columnDelimiter: ',',
                    headerCategory: 'Tea',
                    headerValue: 'value',
                    dateFormatter(timestamp) {
                      return new Date(timestamp).toDateString()
                    }
                  },
                  png: {
                    filename: 'Tea',
                  }
                }
              },
            }
          },
          series: store.getters.getStats.tpieVal
        },{
          title: 'juice usage',
          type:'donut',
          class:"col-xl-5 mt-2",
          dataL: store.getters.getStats.jpieVal.length,
          sum: store.getters.getStats.jpieVal.reduce((a, b) => a + b, 0),
          options: {
            labels: store.getters.getStats.jpieLab,
            noData: nodata,
            chart: {
              toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {download: true},
                export: {
                  csv: {
                    filename: 'Juice',
                    columnDelimiter: ',',
                    headerCategory: 'Juice',
                    headerValue: 'value',
                    dateFormatter(timestamp) {
                      return new Date(timestamp).toDateString()
                    }
                  },
                  png: {
                    filename: 'Juice',
                  }
                }
              },
            }
          },
          series: store.getters.getStats.jpieVal
        },{
          title: 'sugar custom',
          type:'radar',
          class:"col-xl-7 mt-2",
          dataL: store.getters.getStats.sradarVal1.length + store.getters.getStats.sradarVal2.length,
          height:"300",
          series: [{
            name: this.$i18n.t("recipe.L"),
            data: store.getters.getStats.sradarVal1,
            sum: store.getters.getStats.sradarVal1.reduce((a, b) => a + b, 0)
          },{
            name: this.$i18n.t("recipe.M"),
            data: store.getters.getStats.sradarVal2,
            sum: store.getters.getStats.sradarVal2.reduce((a, b) => a + b, 0)
          }],
          options:{
            labels: ['100%','70%','50%','30%','0%'],
            noData: nodata,
            chart: {
              toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {download: true},
                export: {
                  csv: {
                    filename: 'SugarxSize',
                    columnDelimiter: ',',
                    headerCategory: 'SugarxSize',
                    headerValue: 'value',
                    dateFormatter(timestamp) {
                      return new Date(timestamp).toDateString()
                    }
                  },
                  png: {
                    filename: 'SugarxSize',
                  }
                }
              },
            }
          }
        },{
          title: 'ice custom',
          type:'radar',
          class:"col-xl-7 mt-2",
          dataL: store.getters.getStats.iradarVal1.length + store.getters.getStats.iradarVal2.length,
          height:"300",
          series: [{
            name: this.$i18n.t("recipe.L"),
            data: store.getters.getStats.iradarVal1,
            sum: store.getters.getStats.iradarVal1.reduce((a, b) => a + b, 0)
          },{
            name: this.$i18n.t("recipe.M"),
            data: store.getters.getStats.iradarVal2,
            sum: store.getters.getStats.iradarVal2.reduce((a, b) => a + b, 0)
          }],
          options:{
            labels: [this.$i18n.t('recipe.Normal Ice'),this.$i18n.t('recipe.Less Ice'),this.$i18n.t('recipe.Ice Free'),this.$i18n.t('recipe.Warm'),this.$i18n.t('recipe.Hot')],
            noData: nodata,
            chart: {
              toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {download: true},
                export: {
                  csv: {
                    filename: 'IcexSize',
                    columnDelimiter: ',',
                    headerCategory: 'IcexSize',
                    headerValue: 'value',
                    dateFormatter(timestamp) {
                      return new Date(timestamp).toDateString()
                    }
                  },
                  png: {
                    filename: 'IcexSize',
                  }
                }
              },
            }
          }
        },{
          title: 'ice options',
          type:'donut',
          class:"col-xl-5 mt-2",
          dataL: store.getters.getStats.ipieVal.length,
          sum: store.getters.getStats.ipieVal.reduce((a, b) => a + b, 0),
          options: {
            labels: store.getters.getStats.ipieLab.map((key) => {return this.$i18n.t('recipe.'+key)}),
            noData: nodata,
            chart: {
              toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {download: true},
                export: {
                  csv: {
                    filename: 'Ice',
                    columnDelimiter: ',',
                    headerCategory: 'Ice',
                    headerValue: 'value',
                    dateFormatter(timestamp) {
                      return new Date(timestamp).toDateString()
                    }
                  },
                  png: {
                    filename: 'Ice',
                  }
                }
              },
            }
          },
          series: store.getters.getStats.ipieVal
        }];
      }else if(this.robotics){
        stats = [{
          title: 'overview',
          type: 'area',
          class:"col-xl-7 mt-2",
          dataL: this.cookoverviewVal.length,
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
              categories: this.cookoverviewLab
            }
          },
          series: [{
            name: this.$i18n.t('dashboard.Cups'),
            data: this.cookoverviewVal
          }]
        },{
          title: 'tea cooked',
          type:'donut',
          class:"col-xl-5 mt-2",
          dataL: this.cookoverviewVal.length,
          sum: this.cookpieVal.reduce((a, b) => a + b, 0),
          options: {
            labels: this.cookpieLab,
            noData: nodata,
            chart: {
              toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {download: true},
                export: {
                  csv: {
                    filename: 'Tea cooked',
                    columnDelimiter: ',',
                    headerCategory: 'Tea cooked',
                    headerValue: 'value',
                    dateFormatter(timestamp) {
                      return new Date(timestamp).toDateString()
                    }
                  },
                  png: {
                    filename: 'Tea cooked',
                  }
                }
              },
            }
          },
          series: this.cookpieVal
        }];
      }
      return stats
      // return [{
      //   title: 'overview',
      //   type: 'area',
      //   class:"col-xl-7 mt-2",
      //   dataL: store.getters.getStats.overviewVal.length,
      //   options: {
      //     noData: nodata,
      //     chart: {
      //       id: 'overviewLine',
      //       zoom: {
      //         enabled: false
      //       }
      //     },
      //     dataLabels: {
      //       enabled: false
      //     },
      //     stroke: {
      //       curve: 'smooth'
      //     },
      //     grid: {
      //       row: {
      //         colors: ['#f3f3f3', 'transparent'],
      //         opacity: 0.5
      //       },
      //     },
      //     xaxis: {
      //       categories: store.getters.getStats.overviewLab
      //     }
      //   },
      //   series: [{
      //     name: this.$i18n.t('dashboard.Cups'),
      //     data: store.getters.getStats.overviewVal
      //   }]
      // },{
      //   title: 'tea usage',
      //   type:'donut',
      //   class:"col-xl-5 mt-2",
      //   dataL: store.getters.getStats.tpieVal.length,
      //   sum: store.getters.getStats.tpieVal.reduce((a, b) => a + b, 0),
      //   options: {
      //     labels: store.getters.getStats.tpieLab,
      //     noData: nodata,
      //     chart: {
      //       toolbar: {
      //         show: true,
      //         offsetX: 0,
      //         offsetY: 0,
      //         tools: {download: true},
      //         export: {
      //           csv: {
      //             filename: 'Tea',
      //             columnDelimiter: ',',
      //             headerCategory: 'Tea',
      //             headerValue: 'value',
      //             dateFormatter(timestamp) {
      //               return new Date(timestamp).toDateString()
      //             }
      //           },
      //           png: {
      //             filename: 'Tea',
      //           }
      //         }
      //       },
      //     }
      //   },
      //   series: store.getters.getStats.tpieVal
      // },{
      //   title: 'juice usage',
      //   type:'donut',
      //   class:"col-xl-5 mt-2",
      //   dataL: store.getters.getStats.jpieVal.length,
      //   sum: store.getters.getStats.jpieVal.reduce((a, b) => a + b, 0),
      //   options: {
      //     labels: store.getters.getStats.jpieLab,
      //     noData: nodata,
      //     chart: {
      //       toolbar: {
      //         show: true,
      //         offsetX: 0,
      //         offsetY: 0,
      //         tools: {download: true},
      //         export: {
      //           csv: {
      //             filename: 'Juice',
      //             columnDelimiter: ',',
      //             headerCategory: 'Juice',
      //             headerValue: 'value',
      //             dateFormatter(timestamp) {
      //               return new Date(timestamp).toDateString()
      //             }
      //           },
      //           png: {
      //             filename: 'Juice',
      //           }
      //         }
      //       },
      //     }
      //   },
      //   series: store.getters.getStats.jpieVal
      // },{
      //   title: 'sugar custom',
      //   type:'radar',
      //   class:"col-xl-7 mt-2",
      //   dataL: store.getters.getStats.sradarVal1.length + store.getters.getStats.sradarVal2.length,
      //   height:"300",
      //   series: [{
      //     name: this.$i18n.t("recipe.L"),
      //     data: store.getters.getStats.sradarVal1,
      //     sum: store.getters.getStats.sradarVal1.reduce((a, b) => a + b, 0)
      //   },{
      //     name: this.$i18n.t("recipe.M"),
      //     data: store.getters.getStats.sradarVal2,
      //     sum: store.getters.getStats.sradarVal2.reduce((a, b) => a + b, 0)
      //   }],
      //   options:{
      //     labels: ['100%','70%','50%','30%','0%'],
      //     noData: nodata,
      //     chart: {
      //       toolbar: {
      //         show: true,
      //         offsetX: 0,
      //         offsetY: 0,
      //         tools: {download: true},
      //         export: {
      //           csv: {
      //             filename: 'SugarxSize',
      //             columnDelimiter: ',',
      //             headerCategory: 'SugarxSize',
      //             headerValue: 'value',
      //             dateFormatter(timestamp) {
      //               return new Date(timestamp).toDateString()
      //             }
      //           },
      //           png: {
      //             filename: 'SugarxSize',
      //           }
      //         }
      //       },
      //     }
      //   }
      // },{
      //   title: 'ice custom',
      //   type:'radar',
      //   class:"col-xl-7 mt-2",
      //   dataL: store.getters.getStats.iradarVal1.length + store.getters.getStats.iradarVal2.length,
      //   height:"300",
      //   series: [{
      //     name: this.$i18n.t("recipe.L"),
      //     data: store.getters.getStats.iradarVal1,
      //     sum: store.getters.getStats.iradarVal1.reduce((a, b) => a + b, 0)
      //   },{
      //     name: this.$i18n.t("recipe.M"),
      //     data: store.getters.getStats.iradarVal2,
      //     sum: store.getters.getStats.iradarVal2.reduce((a, b) => a + b, 0)
      //   }],
      //   options:{
      //     labels: [this.$i18n.t('recipe.Normal Ice'),this.$i18n.t('recipe.Less Ice'),this.$i18n.t('recipe.Ice Free'),this.$i18n.t('recipe.Warm'),this.$i18n.t('recipe.Hot')],
      //     noData: nodata,
      //     chart: {
      //       toolbar: {
      //         show: true,
      //         offsetX: 0,
      //         offsetY: 0,
      //         tools: {download: true},
      //         export: {
      //           csv: {
      //             filename: 'IcexSize',
      //             columnDelimiter: ',',
      //             headerCategory: 'IcexSize',
      //             headerValue: 'value',
      //             dateFormatter(timestamp) {
      //               return new Date(timestamp).toDateString()
      //             }
      //           },
      //           png: {
      //             filename: 'IcexSize',
      //           }
      //         }
      //       },
      //     }
      //   }
      // },{
      //   title: 'ice options',
      //   type:'donut',
      //   class:"col-xl-5 mt-2",
      //   dataL: store.getters.getStats.ipieVal.length,
      //   sum: store.getters.getStats.ipieVal.reduce((a, b) => a + b, 0),
      //   options: {
      //     labels: store.getters.getStats.ipieLab.map((key) => {return this.$i18n.t('recipe.'+key)}),
      //     noData: nodata,
      //     chart: {
      //       toolbar: {
      //         show: true,
      //         offsetX: 0,
      //         offsetY: 0,
      //         tools: {download: true},
      //         export: {
      //           csv: {
      //             filename: 'Ice',
      //             columnDelimiter: ',',
      //             headerCategory: 'Ice',
      //             headerValue: 'value',
      //             dateFormatter(timestamp) {
      //               return new Date(timestamp).toDateString()
      //             }
      //           },
      //           png: {
      //             filename: 'Ice',
      //           }
      //         }
      //       },
      //     }
      //   },
      //   series: store.getters.getStats.ipieVal
      // }]
    }
  },
  methods:{
    chartStyle(i){
      var style = {};
      if(i === 0 || i % 2 == 0){style.margin = '0 12px 0 0'}
      else{style.margin = '0 0 0 12px'}
      return style
    },
    toggleView(index){Vue.set(this.switchV, index-1, !this.switchV[index-1])}
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
.no-pad{
  padding: 0;
}
.no-pad:hover{
  color: #0081C8;
  background-color: #e3e6f0;
}
.divnoData{
  text-align: center;
  margin: 150px 0;
}
</style>