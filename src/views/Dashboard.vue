<template>
  <div class="wrapper">
		<b-container class="bv-example-row mt-2 noMaxWidth">
			<b-row>
				<b-col class="no-putters">
					<h3>{{$t('dashboard.title')}}</h3>
				</b-col>
				<b-col class="no-putters">
					<DatePicker @change="dateClicked"></DatePicker>
				</b-col>
			</b-row>
		</b-container>

		<div v-if="machineType[0] && machineType[1]" class="no-putters mt-2 noMaxWidth container no-padding">
			<h5 class="text-secondary"><font-awesome-icon fixed-width icon="dumpster-fire"></font-awesome-icon> {{$t('dashboard.tea cooker')}}</h5>
			<hr>
		</div>
		
		<div v-if="machineType[1]" class="noMaxWidth container no-padding">
			<Cards :showSke="showSke" :showStats="showStats" :cookedVal="cookedVal" :waterVal="waterVal" :mostCooked="mostCooked" :cookerHp="cookerHp" :omica="false" :robotics="true"></Cards>
		</div>
	
		<div v-if="machineType[1]" class="noMaxWidth container no-padding">
			<Charts :showSke="showSke"
			:rangeVal="rangeVal"
			:showStats="showStats" 
			:cookoverviewVal= 'cookoverviewVal'
			:cookoverviewLab= 'cookoverviewLab'
			:cookpieVal= 'cookpieVal'
			:cookpieLab= 'cookpieLab'
			:cookpotVal="cookpotVal"
			:omica="false" :robotics="true"
			></Charts>
		</div>

		<div v-if="machineType[1]" class="no-putters mt-2 noMaxWidth container no-padding mt-3">
			<b-card v-show="cook_table_skele">
        <b-card-text>
          <b-skeleton height="350px" />
        </b-card-text>
      </b-card>
			<b-table class="pot_table" v-show="!cook_table_skele" responsive striped hover :items="cookStats" sticky-header="true" :fields=fields>
				<template #cell(id)="data">
					<p v-if="data.value">{{$t('dashboard.'+data.value)}}</p>
					<p v-else>-</p>
				</template>
				<template #cell(type)="data">
					<p v-if="data.value">{{$t('dashboard.'+data.value)}}</p>
					<p v-else>-</p>
				</template>
				<template #cell()="data">
					<p v-if="data.value">{{ data.value }}</p>
					<p v-else>-</p>
				</template>
			</b-table>
		</div>
		
		<div v-if="machineType[0] && machineType[1]" class="no-putters mt-5 noMaxWidth container no-padding">
			<h5 class="text-secondary"><font-awesome-icon fixed-width icon="robot"></font-awesome-icon> {{$t('dashboard.omica')}}</h5>
			<hr>
		</div>

		<div v-if="machineType[0]" class="mt-2 noMaxWidth container no-padding">
			<Cards :showSke="showSke" :showStats="showStats" :madeVal="madeVal" :topVal="topVal" :hrVal="hrVal" :healthVal="healthVal" :omica="true" :robotics="false"></Cards>
		</div>

		<div v-if="machineType[0]" class="noMaxWidth container no-padding">
			<Charts :showSke="showSke"
			:rangeVal="rangeVal"
			:showStats="showStats" 
			:overviewVal= 'overviewVal'
			:tpieVal= 'tpieVal'
			:tpieLab= 'tpieLab'
			:jpieVal= 'jpieVal'
			:jpieLab= 'jpieLab'
			:sradarVal1= 'sradarVal1'
			:sradarVal2= 'sradarVal2'
			:iradarVal1= 'iradarVal1'
			:iradarVal2= 'iradarVal2'
			:ipieVal= 'ipieVal'
			:ipieLab= 'ipieLab'
			:omica="true" :robotics="false"
			></Charts>
		</div>
  </div>
</template>

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
<script>
	import { functions, httpsCallable, db, collection, doc, getDoc, getDocs, query, where, perf, trace } from "../fire";
	import store from '../store/store'
	import { mapGetters } from 'vuex'
	import Cards from '../components/dashboard/Cards.vue'
	import Charts from '../components/dashboard/Charts.vue'
	import DatePicker from '../components/dashboard/DatePicker.vue'
	import moment from 'moment'
	import Vue from 'vue'
	Vue.prototype.moment = moment
	
	export default {
		name: 'Dashboard',
		components: { DatePicker, Cards, Charts },
		data(){
			return {
				showSke: true,
				showStats: false,
				brandL:'',
				rangeVal: store.getters.getDateRange,
				cookedVal: 'No data',
				waterVal: 'No data',
				mostCooked: 'No data',
				cookerHp: '100%',
				cookoverviewVal: [],
				cookoverviewLab: [],
				cookpieVal: [],
				cookpieLab: [],
				cookpotVal: [],
				cookStats:[],
				cook_table_skele:true,
				madeVal: store.getters.getStats.madeVal,
				topVal: store.getters.getStats.topVal,
				hrVal: store.getters.getStats.hrVal,
				healthVal: store.getters.getStats.healthVal,
				overviewVal: store.getters.getStats.overviewVal,
				overviewLab: store.getters.getStats.overviewLab,
				tpieVal: store.getters.getStats.tpieVal,
				tpieLab: store.getters.getStats.tpieLab,
				jpieVal: store.getters.getStats.jpieVal,
				jpieLab: store.getters.getStats.jpieLab,
				sradarVal1: store.getters.getStats.sradarVal1,
				sradarVal2: store.getters.getStats.sradarVal2,
				iradarVal1: store.getters.getStats.iradarVal1,
				iradarVal2: store.getters.getStats.iradarVal2,
				ipieVal: store.getters.getStats.ipieVal,
				ipieLab: store.getters.getStats.ipieLab,
			}
		},
		computed:{
			...mapGetters([
				'getLocation'
			]),
			'machineType':function(){
				var omica = false,
				robotics = false,
				machine = store.getters.getMachineType,
				m = '';
				for(m in machine){
					if(machine[m] == "omica"){omica = true}
					else if(machine[m] == "robotics"){robotics = true}
				}
				return [omica,robotics]
			},
			'fields':function(){
				var fields = [{
					key:'date',
					label:this.$i18n.t('dashboard.date')
				},{
					key:'time',
					label:this.$i18n.t('dashboard.time')
				},{
					key:'id',
					label:this.$i18n.t('dashboard.pot')
				},{
					key:'type',
					label:this.$i18n.t('dashboard.type')
				},{
					key:'name',
					label:this.$i18n.t('dashboard.name')
				}, {
					key:'water',
					label:this.$i18n.t('dashboard.water')
				}];
				return fields
			},
		},
		watch:{
			getLocation(val){
				this.brandL = val;
				this.getHealth();
				this.dateClicked(this.rangeVal);
			}
		},
		methods:{
			setLoadingState(v1,v2){
				this.showSke = v1;
				this.showStats = v2;
				this.cook_table_skele = v1;
			},
			async getHealth(){
				var getHealth =  httpsCallable(functions,'getMHealth');
				var health = await getHealth({docPath:'stats/'+this.brandL}).then(result => {
					return (result.data.health) ? result.data.health : "No data";
				});
				store.commit('healthUpdate', health);
			},
			async dateClicked(val){
				const t = trace(perf,"getStats");
				t.start();
				this.setLoadingState(true,false);
				this.rangeVal = val;
				var stats = await getStats(val[0],val[1],this.brandL); //need to fix next year data by moment
				var cookStats = await getCookerStats(val[0],val[1],this.brandL);
				this.cookedVal = cookStats.cooked_count.toString();
				this.waterVal = cookStats.water_count.toString();
				this.mostCooked = cookStats.most_cooked.toString()==""?"No Data":cookStats.most_cooked.toString()+": "+cookStats.max;
				this.cookpieVal = cookStats.pieVal;
				this.cookpieLab = cookStats.pieLab;
				this.cookoverviewVal = cookStats.hrVal;
				this.cookoverviewLab = cookStats.hrLab;
				this.cookpotVal = cookStats.pot_cooked;
				this.cookStats = cookStats.cookStats;
				var sorted = this.renderStats(stats);
				sorted = await sorted.then(result =>{return result});
				store.commit('statsChanged', sorted);
				this.setLoadingState(false,true);
				t.stop();
			},
			async renderStats(stats){
				var hours = exeractVal(stats[5]),
				tea = exeractVal(stats[6]),
				juice = exeractVal(stats[7]),
				sradar = exeractRadar(stats[8]),
				iradar = exeractRadar(stats[9]),
				ice = exeractVal(stats[10]);
				var sorted = [
					stats[1].toString(),stats[2],stats[3],hours[0],hours[1],
					tea[0],tea[1],juice[0],juice[1],
					sradar[0],sradar[1],iradar[0],iradar[1],
					ice[0],ice[1]
				];
				return sorted
			}
    },
		async mounted(){
			this.rangeVal = store.getters.getDateRange;
			if(this.brandL == ''){
				this.brandL = this.getLocation;
				this.getHealth();
				this.dateClicked(this.rangeVal);
			}
		}
	}

	function wrap(){
    return new Promise((resolve) => setTimeout(resolve, 500));
	}

	async function getCookerStats(s,e,brandL){
		var start = moment(s),
		end = moment(e).add(1, 'day'),
		[max,cooked_count,water_count] = [0,0,0],
		[tea_cooked,stats,hr_cooked,pot_count] = [{},{},{},{}],
		[most_cooked,cooked,fastCleanVal,fullCleanVal,cookedVal,pieVal,pieLab,hrVal,hrLab,teaname,pot_cooked,potVal,cookStats] = [[],[],[],[],[],[],[],[],[],[],[],[],[]];
		try{
			while(!start.isSame(end)){
				var d = start.format('YYYYMMDD');
				const querySnapshot = await getDocs(collection(db,"/teacooker/"+brandL+"/"+d));
				querySnapshot.forEach(async (docs)=>{
					var docRef = doc(db,"/teacooker/"+brandL+"/"+d,docs.id);
					var docSnap = await getDoc(docRef);
					if(docSnap.exists()){
						cookStats.push(docSnap.data());
						if(docSnap.data()['type']=="cook"){
							cooked_count +=1;
							water_count += parseInt(docSnap.data()['water']);
							cooked.push(docSnap.data()['name']);
							tea_cooked[docSnap.data()['name']] = (tea_cooked[docSnap.data()['name']] || 0) + 1;
							hr_cooked[docSnap.id.substring(0,2)] = (hr_cooked[docSnap.id.substring(0,2)] || 0) + 1;
							if(tea_cooked[docSnap.data()['name']] > max){ 
								max = tea_cooked[docSnap.data()['name']];
							}
							cookedVal.push(docSnap.data()['id']+"!@"+docSnap.id+"!@"+docSnap.data()['name']+"!@"+docSnap.data()['water']);
							potVal.push(docSnap.data()['id']+"!@"+docSnap.data()['name']);
							if(!teaname.includes(docSnap.data()['name'])){teaname.push(docSnap.data()['name'])}
						}else if(docSnap.data()['type']=="fastClean"){
							fastCleanVal.push(docSnap.data()['id']+"!@"+docSnap.id);
						}else if(docSnap.data()['type']=="fullClean"){
							fullCleanVal.push(docSnap.data()['id']+"!@"+docSnap.id);
						}
					}else{
						console.log("No such document!");
					}
				});
				stats[d] = {
					fastClean:fastCleanVal,
					fullClean:fullCleanVal,
					cooked:cookedVal
				};
				if(start.format("MMDD")=="1231"){
					var next = parseInt(start.format("YYYY"))+1;
					start = moment(next.toString()+"0101"); // change to next year
				}else{
					start.add(1, 'day');
				}
			}
		}catch(e){
			console.log(e);
		}finally{
			await wrap();
			potVal.forEach(async function(x){pot_count[x] = (pot_count[x] || 0) + 1;});
			for(var tea in teaname){
				pot_cooked.push({
					name:teaname[tea],
					data:[pot_count["cooker1!@"+teaname[tea]]||0,pot_count["cooker2!@"+teaname[tea]]||0,pot_count["cooker3!@"+teaname[tea]]||0]
				})
			}
			for(var c in tea_cooked){
				if(tea_cooked[c]==max){most_cooked.push(c)}
				pieVal.push(tea_cooked[c]);
				pieLab.push(c);
			}
			for(var b in hr_cooked){
				hrVal.push(hr_cooked[b]);
				hrLab.push(parseInt(b));
			}
			hrLab.sort((x, y) => {if (x > 0 && y > 0) {return x - y;}return y - x;});
			return {cooked: cooked, cooked_count:cooked_count,water_count:water_count,tea_cooked:tea_cooked,max:max,most_cooked:most_cooked,pieVal:pieVal,pieLab:pieLab,hrVal:hrVal,hrLab:hrLab,pot_cooked:pot_cooked,cookStats:cookStats};
		}
	}

	async function getStats(s,e,brandL){
		const getStats = httpsCallable(functions, 'getStats');
		var getList =[];
		var stats = [];
		await getStats({ docPath:'stats/'+brandL,start:s,end:e }).then((result) => {
			// const data = result.data.header.slice(1,-1);
			getList = result.data.list;
		});
		var mTime = 0;
		if(getList.length>0){stats = await sortList(getList, s, e, brandL)}
		else{
			mTime = await getMTime(s,e,brandL);
			stats = ['','No data','No data','No data','100%'] // mTime
		}
		store.commit('updateStats', getList);
		return stats;
	}

	async function getMTime(s,e,brandL){
		const docRef = doc(db, "status", brandL);
		const docSnap = await getDoc(docRef);
		var mTime = 0;
		if(docSnap.exists()){
			var list = docSnap.data()['duration'],
			totalHours = 0;
			if(s == e){
				if(typeof docSnap.data()['onTime'][s] !== 'undefined'){
					var current = docSnap.data()['onTime'],
					now = Date.now();
					if(docSnap.data()['state']=="online"){totalHours = now - current[s]}
					if(list[s]>0){totalHours = totalHours + parseInt(list[s])}
					mTime = msToTime(totalHours);
				}else{
					mTime = 'No Data';
				}
			}else{
				for(var d=parseInt(s);d<=parseInt(e);d++){if(list[d.toString()]){totalHours += parseInt(list[d.toString()])}}
				mTime = msToTime(totalHours);
			}
		}else{
			mTime = 'No Data';
		}
		return mTime
	}
	async function sortList(getList, s, e, brandL){
		var drinkCount = 0,
		rangeD = s,
		title = ['Cold Water','Hot Water','Ice','Sugar 100%','Sugar 30%','Sugar 50%','Sugar 70%','data0','size-L','size-M','temp-0','temp-1','temp-2','temp-3','temp-4','topping-0','topping-1','total'],
		[liquidValue,tempValue,sugarValue,sizeValue,toppingValue,teaRank,teaVal,juiceVal,juiceRank,milkVal,sugarRank,sugarSize,iceSize,itemSum] = [{},{},{},{},{},[],{},{},[],{},[],{},{},{}];
		var [hr,hm] = [[],[]];
		var [header,teaHead,jHead] = ['','',''];
		var [l,i,j,k,t,x,header,health] = ['','','','','','','',''];
		if(getList.length>0){
			var start = moment(s),
			end = moment(e);
			// for(start; start.diff(end, 'days') <= 0; start.add(1, 'days')){
					
			// }
			// while(!start.isSame(end)){
			// 	var d = start.format('YYYYMMDD');
			// 	rangeD = d;
			// 		for(l in getList){//l=index
			// 			for(i in getList[l][rangeD]){//i=index
			// 				for(j in getList[l][rangeD][i]){ //j=title/name
			// 					for(k in getList[l][rangeD][i][j]){ //k=index
			// 						if(j=="0Header" && k==0){header=getList[l][rangeD][i]["0Header"][k];}//get header
			// 						var slug = getList[l][rangeD][i][j][k].split(':');//0=before, 1=after
			// 						if(i==0 && slug[0]=="total"){drinkCount=drinkCount+parseInt(slug[1]);} //get drink total
			// 						if(!title.includes(slug[0]) && i == 0){liquidValue[slug[0]] = (liquidValue[slug[0]]+parseInt(slug[1])) || parseInt(slug[1]);} //get liquid value
			// 						tempValue = countValue(i,slug,"-","temp",tempValue); //get tempValue
			// 						sugarValue = countValue(i,slug,'-',"Sugar",sugarValue);//get sugarValue
			// 						sizeValue = countValue(i,slug,"-","size",sizeValue);//get sizeValue
			// 						toppingValue = countValue(i,slug,"-","topping",toppingValue);//get toppingValue
			// 						if(slug[0].substring(0,3)=="tea"){teaVal[slug[0]]=slug[1]}
			// 						if(slug[0].substring(0,1)=="j"){juiceVal[slug[0]]=slug[1]}
			// 						if(slug[0].substring(0,4)=="milk"){milkVal[slug[0]]=slug[1]}
			// 						if(slug.length == 4){// get hour min total console.log(slug);
			// 							hr.push(slug[0]);
			// 							hm.push(slug[0]+slug[1]);
			// 						}
			// 						if(j!=="0Header"){
			// 							var splitData = getList[l][rangeD][i][j][k].split(',');
			// 							if(splitData.length>1){//1: size; 2: ice; 5: sugar
			// 								iceSize[splitData[1]+'I'+splitData[2]] = (iceSize[Object.keys(countCustom(splitData[2],splitData[1],'I'))]+1) || 1;
			// 								sugarSize[splitData[1]+'S'+splitData[5]] = (sugarSize[Object.keys(countCustom(splitData[5],splitData[1],'S'))]+1) || 1;
			// 							}
			// 						}
			// 						console.log(hr,hm);
			// 					}
			// 					if(j!=="0Header"){itemSum[j] = getList[l][rangeD][i][j].pop().replace('total:', '')}
			// 				}
			// 			}
			// 		}
			// 	if(start.format("MMDD")=="1231"){
			// 		var next = parseInt(start.format("YYYY"))+1;
			// 		start = moment(next.toString()+"0101");
			// 	}else{
			// 		start.add(1, 'day');
			// 	}
			// }
			// console.log(tempValue,sugarValue,sizeValue,toppingValue,hr,hm,iceSize,sugarSize);
			for(var x=s;x<=e;x++){
				var last2 = x.toString().slice(-2);
				if(last2<32 && last2 != 0){
					rangeD = x;
					for(l in getList){//l=index
						for(i in getList[l][rangeD]){//i=index
							for(j in getList[l][rangeD][i]){ //j=title/name
								for(k in getList[l][rangeD][i][j]){ //k=index
									if(j=="0Header" && k==0){header=getList[l][rangeD][i]["0Header"][k];}//get header
									var slug = getList[l][rangeD][i][j][k].split(':');//0=before, 1=after
									if(i==0 && slug[0]=="total"){drinkCount=drinkCount+parseInt(slug[1]);} //get drink total
									if(!title.includes(slug[0]) && i == 0){liquidValue[slug[0]] = (liquidValue[slug[0]]+parseInt(slug[1])) || parseInt(slug[1]);} //get liquid value
									tempValue = countValue(i,slug,"-","temp",tempValue); //get tempValue
									sugarValue = countValue(i,slug,'-',"Sugar",sugarValue);//get sugarValue
									sizeValue = countValue(i,slug,"-","size",sizeValue);//get sizeValue
									toppingValue = countValue(i,slug,"-","topping",toppingValue);//get toppingValue
									if(slug[0].substring(0,3)=="tea"){teaVal[slug[0]]=slug[1]}
									if(slug[0].substring(0,1)=="j"){juiceVal[slug[0]]=slug[1]}
									if(slug[0].substring(0,4)=="milk"){milkVal[slug[0]]=slug[1]}
									if(slug.length == 4){// get hour min total console.log(slug);
										hr.push(slug[0]);
										hm.push(slug[0]+slug[1]);
									}
									if(j!=="0Header"){
										var splitData = getList[l][rangeD][i][j][k].split(',');
										if(splitData.length>1){//1: size; 2: ice; 5: sugar
											iceSize[splitData[1]+'I'+splitData[2]] = (iceSize[Object.keys(countCustom(splitData[2],splitData[1],'I'))]+1) || 1;
											sugarSize[splitData[1]+'S'+splitData[5]] = (sugarSize[Object.keys(countCustom(splitData[5],splitData[1],'S'))]+1) || 1;
										}
									}
								}
								if(j!=="0Header"){itemSum[j] = getList[l][rangeD][i][j].pop().replace('total:', '')}
							}
						}
					}
				}
			}
		}

		var [counthr,counthm] = [{},{}];
		counthr = countTime(hr);
		counthm = countTime(hm);
		var maxHr = Object.keys(counthr).reduce((a, b) => counthr[a] > counthr[b] ? a : b);
		maxHr = maxHr + '00 - ' + (parseInt(maxHr)+1) +'00';
		delete liquidValue.header; // delete object liquid value header
		for(t in tempValue){
			var x = t.split('-')[1];
		}
		
		header = header.split(',');
		teaHead= header.splice(8,10);
		for(x in teaVal){
			var y = parseInt(x.split('tea')[1])-1;
			if(teaHead[y].substring(0,3) !== 'tea'){delete Object.assign(teaVal,{[teaHead[y]]:teaVal[x]})[x];}
			else if(teaHead[y].substring(0,3) == 'tea' && teaVal[x] == 0){delete teaVal[teaHead[y]]}
		}
		var teaTop = sortTop(teaVal);
		for(x in teaTop){teaRank.push(x)}
		
		// var machineTime = await getMTime(start,end,brandL);

		if(teaRank[0]){
			var topCat = [];
			var totalCat = {};
			for(i in itemSum){
				const q2 = query(collection(db, 'recipes',brandL,"Category"), where("Online", "array-contains", i));
				const querySnapshot = await getDocs(q2);
				querySnapshot.forEach((doc) => {totalCat[doc.id] = (totalCat[doc.id]+parseInt(itemSum[i])) || parseInt(itemSum[i])});
			}
			var sortCat = sortTop(totalCat);
			for(t in sortCat){topCat.push(t)}	
		}
		
		jHead=header.slice(8,16);
		for(x in juiceVal){
			var y = parseInt(x.split('j')[1])-1;
			if(jHead[y].substring(0,1) !== 'j'){delete Object.assign(juiceVal,{[jHead[y]]:juiceVal[x]})[x];}
			else if(jHead[y].substring(0,1) == 'j' && juiceVal[x] == 0){delete juiceVal[jHead[y]]}
		}
		var juiceTop = sortTop(juiceVal);
		for(x in juiceTop){juiceRank.push(x)}
		
		var sugarTop = sortTop(sugarValue);
		for(x in sugarTop){sugarRank.push(x)}

		return [header,drinkCount,topCat[0],maxHr,health,counthr,teaTop,juiceTop,sugarSize,iceSize,tempValue]
  }

  function msToTime(t){
		var milliseconds = Math.floor((t % 1000) / 100),
		seconds = Math.floor((t / 1000) % 60),
		minutes = Math.floor((t / (1000 * 60)) % 60),
		hours = Math.floor((t / (1000 * 60 * 60)) % 24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

		return hours + ":" + minutes + ":" + seconds;
	}

	function countCustom(val,size,t){
		var count = {};
		switch(parseInt(val)){
			case 0: count[size+t+val] = (count[size+val]+1) || 1; break;
			case 1: count[size+t+val] = (count[size+val]+1) || 1; break;
			case 2: count[size+t+val] = (count[size+val]+1) || 1; break;
			case 3: count[size+t+val] = (count[size+val]+1) || 1; break;
			case 4: count[size+t+val] = (count[size+val]+1) || 1;
		}
		return count;
	}

	function countTime(arr){
		var obj = {};
		arr.forEach(function (x){obj[x] = (obj[x] || 0)+1;});
		return obj;
	}

	function countValue(i,slug,str,val,value){
		if(i==0 && slug[0].split(str)[0]==val){value[slug[0]] = (value[slug[0]]+parseInt(slug[1])) || parseInt(slug[1]);} //get value
		return value;
	}

	function sortTop(sortValue){
		var sortable = Object.fromEntries(
			Object.entries(sortValue).sort(([,b],[,a]) => a-b)//top 4 value
		);
		return sortable;
	}

	function exeractVal(val){
		var [x,k,v] = ['',[],[]];
		for(x in val){
			if(x.startsWith("temp-") && val!== undefined){
				k = ['Normal Ice','Less Ice','Ice Free','Warm','Hot'];
				v = [0,0,0,0,0];
			}
		}
		for(x in val){
			if(x.startsWith("temp-")){
				switch(x.charAt(5)){
					case "0": v[0] = val[x]; break;
					case "1": v[1] = val[x]; break;
					case "2": v[2] = val[x]; break;
					case "3": v[3] = val[x]; break;
					case "4": v[4] = val[x];
				}
			}else{
				k.push(x);
				v.push(parseInt(val[x]));
			}
		}
		return [k,v]
	}

	function exeractRadar(val){
		var [x,M,L] = ['',[],[]];
		if(val !== undefined){[M,L] = [[0,0,0,0,0],[0,0,0,0,0]]}
		for(x in val){
			if(x.charAt(0)=="M"){
				switch(x.charAt(2)){
					case "0": M[0] = val[x]; break;
					case "1": M[1] = val[x]; break;
					case "2": M[2] = val[x]; break;
					case "3": M[3] = val[x]; break;
					case "4": M[4] = val[x];
				}
			}else{
				switch(x.charAt(2)){
					case "0": L[0] = val[x]; break;
					case "1": L[1] = val[x]; break;
					case "2": L[2] = val[x]; break;
					case "3": L[3] = val[x]; break;
					case "4": L[4] = val[x];
				}
			}
		}
		return [L,M]
	}
</script>

<style scoped>
@media (max-width: 768px){	
	.no-padding{
		padding-left: 0;
		padding-right: 0;
	}
}
.noMaxWidth{
	max-width: unset !important;
}

.pot_table{
	border-radius: 5px;
	box-shadow: 3px 3px 6px 0px rgba(45,45,45,0.1);
}
</style>
