<template>
   <div class="wrapper">
    <b-container class="mt-3 noMaxWidth">
			<b-row>
        <b-col class="no-putters" cols="3">
					<b-button size="sm" variant="outline-dark" @click="$router.push('/dashboard')">{{$t('stats.back')}}</b-button>
				</b-col>
				<b-col class="no-putters text-center m-auto" cols="6">
					<h5>{{$t('stats.title')}}</h5>
          <small class="text-dark">{{dateRange}}</small>
				</b-col>
        <b-col class="no-putters text-end" cols="3">
          <vue-excel-xlsx :data="rednerTable" :columns="columns" :filename="'Stats'+dateRange" :sheetname="dateRange" class="btn btn-outline-success btn-sm">
            {{$t('stats.export')}}
          </vue-excel-xlsx>
				</b-col>
			</b-row>
      <div class="mt-3 text-dark">
        <b-row>
          <b-col cols="6">
            <b>{{$t('stats.total')}} {{rednerTable.length}}</b>
          </b-col>
          <b-col cols="6">
            <b-form-group :label="$t('stats.search')" label-for="searchInp" label-cols-sm="3" label-align-sm="right" label-size="sm" class="mb-2 w-50 float-right">
              <b-input-group size="sm">
                <b-form-input id="searchInp" v-model="filter" type="search"></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-table striped hover responsive :items="rednerTable" :fields="fields" :filter="filter" :sort-by.sync="sortBy" class="mt-3">
          <template #cell(Size)="data">
            {{$t('stats.'+data.item.Size)}}
          </template>
          <template #cell(Ice)="data">
            {{$t('stats.'+data.item.Ice)}}
          </template>
        </b-table>
      </div>
		</b-container>  
   </div>
</template>

<script>
import store from '../store/store'

export default {
  name: 'Stats',
  data(){
    return {
      dateRange: this.$route.params.id,
      filter: null,
      sortBy: "Date"
    }
  },
  computed:{
    'columns':function(){
      return [
        {label:this.$i18n.t('stats.date'),field: "Date"},
        {label:this.$i18n.t('stats.time'),field: "Time"},
        {label:this.$i18n.t('stats.name'),field: "Name"},
        {label:this.$i18n.t('stats.size'),field: "Size"},
        {label:this.$i18n.t('stats.ice'),field: "Ice"},
        {label:this.$i18n.t('stats.sugar'),field: "Sugar"},
        {label:this.$i18n.t('stats.sugar used'),field: "SugarU"},
        {label:this.$i18n.t('stats.tea'),field: "Tea"},
        {label:this.$i18n.t('stats.juice'),field: "Juice"},
        {label:this.$i18n.t('stats.milk'),field: "Milk"},
        {label:this.$i18n.t('stats.cold'),field: "Cold"},
        {label:this.$i18n.t('stats.hot'),field: "Hot"}
      ]
    },
    'fields':function(){
      return [
        {"key":"Date",label:this.$i18n.t('stats.date'),sortable: true},
        {"key":"Time",label:this.$i18n.t('stats.time'),sortable: true},
        {"key":"Name",label:this.$i18n.t('stats.name'),sortable: true},
        {"key":"Size",label:this.$i18n.t('stats.size'),sortable: true},
        {"key":"Ice",label:this.$i18n.t('stats.ice'),sortable: true},
        {"key":"Sugar",label:this.$i18n.t('stats.sugar'),sortable: true},
        {"key":"SugarU",label:this.$i18n.t('stats.sugar used'),sortable: true},
        {"key":"Tea",label:this.$i18n.t('stats.tea'),sortable: true},
        {"key":"Juice",label:this.$i18n.t('stats.juice'),sortable: true},
        {"key":"Milk",label:this.$i18n.t('stats.milk'),sortable: true},
        {"key":"Cold",label:this.$i18n.t('stats.cold'),sortable: true},
        {"key":"Hot",label:this.$i18n.t('stats.hot'),sortable: true}
      ]
    },
    'rednerTable':function(){
      var stats = store.getters.getStats.stats,
      tableVal=[],date=[],time=[],name=[],size=[],ice=[],sugar=[],sugarUse=[],milk=[],tea=[],juice=[],cold=[],hot=[],
      sizeOpt={'L':'Large','M':"Small"},sugarOpt=['100%','70%','50%','30%','0%'],iceOpt=['Normal','Less','No Ice','Warm','Hot'],
      s=0,t=0,u=0,v=0,w=0,d=0;
      
      for(s in stats){// index
        for(t in stats[s]){// date yyyymmdd
          stats[s][t].shift(); // remove 0Header
          for(u in stats[s][t]){
            for(v in stats[s][t][u]){// stats[s][t][u][v].pop();
              var sortStats = stats[s][t][u][v];
              for(w in sortStats){
                date.push(t);
                time.push(sortStats[w].slice(0,8));
                var sort = sortStats[w].slice(9,sortStats[w].length).split(',');
                name.push(sort[0]);
                size.push(sizeOpt[sort[1]]);
                ice.push(iceOpt[sort[2]]);
                sugar.push(sugarOpt[sort[5]]);
                sugarUse.push(sort[6]);
                milk.push(parseInt(sort[7])+parseInt(sort[8]));
                tea.push(sort.slice(9,19).reduce((a, b) => parseInt(a) + parseInt(b), 0));// 9 - 18
                juice.push(sort.slice(19,27).reduce((a, b) => parseInt(a) + parseInt(b), 0));// 19 - 27
                cold.push(sort[27]);
                hot.push(sort[28]);
              }
            }
          }
        }
      }
      for(d in date){tableVal.push({Date:date[d],Time:time[d],Name:name[d],Size:size[d],Ice:ice[d],Sugar:sugar[d],SugarU:sugarUse[d],Tea:tea[d],Juice:juice[d],Milk:milk[d],Cold:cold[d],Hot:hot[d]})}
      return tableVal
    }
  }
}
</script>

<style>
thead>tr>th>div{
  width: 90px !important;
}
</style>