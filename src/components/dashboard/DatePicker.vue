<template>
  <date-range-picker v-model="dateRange"
  :autoApply= true
  :date-format="dateFormat"
  :opens="opens"
  :maxDate="maxDate"
  :ranges="ranges"
  :locale-data="locale"
  @update='update'>
    <template #input="picker" :id="picker" style="min-width: 350px;">
      <font-awesome-icon fixed-width icon="calendar"/>
			<a>{{$t('dashboard.'+dateRange.label)}}</a>
      <font-awesome-icon fixed-width icon="caret-down" size="xs"/>
    </template>
    <template #ranges="ranges">
      <div class="ranges">
        <ul class="labels">
          <li v-for="(range, name, index) in ranges.ranges" :key="name" @click="ranges.clickRange(range); setActive(index)" :class="{ 'active': activeIndex === index }">
            <b>{{$t('dashboard.'+name)}}</b>
          </li>
        </ul>
      </div>
    </template>
  </date-range-picker>
</template>

<script>
  import DateRangePicker from 'vue2-daterange-picker'
	import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
	import moment from 'moment/src/moment'
	import 'moment/src/lib/locale/locale'
	import store from '../../store/store'

  export default ({
    name:'datePicker',
    components: { DateRangePicker },
    data(){
      let startDate = new Date();
			var x = startDate.toISOString().split('T')[0];
			x = x.replace(/-/g,'');
			store.commit('rangeChanged', [x,x]);
      return{
        dateRange: {
          startDate: startDate,
          endDate: startDate,
					label: 'Today',
        },
				rangeVal:[startDate, startDate],
				maxDate:startDate,
				opens: "left",
				locale: {
					direction: 'ltr',
					format: 'YYYY-MM-DD',
					separator: ' - ',
					applyLabel: 'Apply',
					cancelLabel: 'Cancel',
					weekLabel: 'W',
					customRangeLabel: 'Custom Range',
					daysOfWeek: moment.weekdaysMin(),
					monthNames: moment.monthsShort(),
					firstDay: 1,
					showWeekNumbers: true
				},
				ranges:{
					'Today': [moment().toDate(), moment().toDate()],
					'Yesterday': [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()],
					'This Week': [moment().startOf('isoWeek').toDate(), moment().toDate()],
					'This Month': [moment().startOf('month').toDate(), moment().toDate()],
					'Last Month': [moment().subtract(1, 'month').startOf('month').toDate(), moment().subtract(1, 'month').endOf('month').toDate()]
				},
				activeIndex: 0
      }
    },
    methods: {
      dateFormat(classes, date){
        if(!classes.disabled && !classes.today){classes.disabled = date.getTime() > new Date()}
        return classes
      },
			update(date){
				var start = date.startDate.toLocaleDateString(),
				end = date.endDate.toLocaleDateString();
				this.customRange = false;
				if(start == this.ranges['Today'][0].toLocaleDateString() && end == this.ranges['Today'][1].toLocaleDateString()){this.dateRange.label = "Today"}
				else if(start == this.ranges['Yesterday'][0].toLocaleDateString() && end == this.ranges['Yesterday'][1].toLocaleDateString()){this.dateRange.label = "Yesterday"}
				else if(start == this.ranges['This Week'][0].toLocaleDateString() && end == this.ranges['This Week'][1].toLocaleDateString()){this.dateRange.label = "This Week"}
				else if(start == this.ranges['This Month'][0].toLocaleDateString() && end == this.ranges['This Month'][1].toLocaleDateString()){this.dateRange.label = "This Month"}
				else if(start == this.ranges['Last Month'][0].toLocaleDateString() && end == this.ranges['Last Month'][1].toLocaleDateString()){this.dateRange.label = "Last Month"}
				else{this.activeIndex = '';this.dateRange.label = 'Custom Range';}
				var x = date.startDate.toISOString().split('T')[0],
				y = date.endDate.toISOString().split('T')[0];
				this.rangeVal = [x.replace(/-/g,''), y.replace(/-/g,'')];
				this.$emit('change',this.rangeVal);
				store.commit('rangeChanged', this.rangeVal);
			},
			setActive(index){this.activeIndex = index}
    }
  })
</script>

<style scoped>
.labels{
	display: flex;
	flex-wrap: wrap;
}
.vue-daterange-picker{
	float: right !important;
}
.daterangepicker .ranges li{
	width: 100%;
}
</style>