<template>
	<div
		class="vd-sidebar-container"
		:class="{hidden: !isVisible}"
	>
		<div class="vd-sidebar-header" :class="{hidden: !isVisible}">
			<button
				class="close-btn"
				v-if="showCloseButton"
				@click="closeSidebar"
			>x</button>
			<slot name="header">
				<div class="header text-center">
          <!-- <img src="@/assets/logow.png" class="logo"> -->
          <h1 class="title">Drinktec</h1>
          <hr>
        </div>
			</slot>
		</div>
		<div class="vd-sidebar-content">
			<slot name="content">
				<div class="margin-top">
          <b-nav vertical>
            <div><font-awesome-icon fixed-width icon="stream"/> {{$t('nav.general')}}</div>
            <b-nav-item>
              <router-link to="/dashboard"><font-awesome-icon fixed-width icon="tachometer-alt"/>{{$t('nav.dashboard')}}</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/recipe"><font-awesome-icon fixed-width icon="file-alt"/>{{$t('nav.recipe')}}</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/report"><font-awesome-icon fixed-width icon="tools"/>{{$t('nav.report')}}</router-link>
            </b-nav-item>
            <hr class="sidebar-divider">
            <div><font-awesome-icon fixed-width icon="cog"/>{{$t('nav.settings')}}</div>
            <b-nav-item>
              <router-link to="/permissions"><font-awesome-icon fixed-width icon="user-shield"/>{{$t('nav.permissions')}}</router-link>
            </b-nav-item>
            <hr class="sidebar-divider">
            <div><font-awesome-icon fixed-width icon="hdd"/>{{$t('nav.others')}}</div>
            <b-nav-item>
              <router-link to="/"><font-awesome-icon fixed-width icon="server"/>{{$t('nav.changelog')}}</router-link>
            </b-nav-item>
            <hr class="sidebar-divider">
            <b-nav-item>
              <select v-model="$i18n.locale">
                <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
              </select>
            </b-nav-item>
          </b-nav>
        </div>
			</slot>
		</div>
	</div>
</template>

<script>
export default {
  name:'sidebbar',
  props:{
		isVisible: { type: Boolean , default: true },
		showCloseButton: { type: Boolean, default: false }
	},
  data(){
    return{
			background: 'white',
      langs: ['en','zh-tw']
    }
  },
	methods:{
		closeSidebar() {
			this.$emit('close-sidebar');
		}
	}
}
</script>>

<style scoped>
	.vd-sidebar-container{
		z-index: 40;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		width: 250px;
		box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
		background-color:#084e74 !important;
    color:white;
		overflow-y: auto;
		overflow-x: hidden;
		transition: all 0.5s;
		-webkit-transition: all 0.5s;
	}
 .vd-sidebar-container.hidden{
		left: -250px;
		opacity: 0;
	}
  .nav-item a,.close-btn{
    color:#eaeaea;
  }
 .close-btn{
		position: absolute;
		z-index: 200;
		right: 10px;
		top: 0;
		background-color: transparent !important;
		font-size: 2rem;
		border: none;
		cursor: pointer;
	}
 .vd-sidebar-header{
		z-index: 45;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		width: 250px;
		height: 130px;
		overflow-y: auto;
		transition: all 0.5s;
		-webkit-transition: all 0.5s;
		/* background-color: white; */
	}
	.vd-sidebar-header.hidden{
		left: -250px;
		opacity: 0;
	}
	.vd-sidebar-content{
		padding: 120px 1rem 0rem 1rem;
		width: 250px;
	}
  .header{
    /* text-align: center; */
    padding: 1rem;
  }
  .logo{
    width: 80px;
  }
	.router-link-exact-active{
		font-weight: bold;
		color: white !important;
	}
/* .router-link-exact-active > button {
  background-color: #44b783 !important;
  color: white !important;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2) !important;
  margin-bottom: 15px;
} */
  .svg-inline--fa{
    vertical-align: middle;
    margin-right: 0.5rem;
  }
/* .button {
  justify-content: left !important;
}
.margin-top {
  margin-top: 2rem;
}
.margin-btn {
  margin-bottom: 10px;
} */
</style>