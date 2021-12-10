<template>
  <div id="home">
    <SidebarItems
      :isVisible="sidebarIsVisible"
      :showCloseButton="isCollapse"
      @close-sidebar="closeSidebar"
      :headerHeight="sidebarHeaderHeight"
      :background="sidebarBackground"
    />
    <div class="vd-main">
      <HeaderItems
        :showMenuButton="isCollapse"
        @open-menu="openMenu"
        :pageBackground="pageBackground"
        :background="headerBackground"
      />
      <div class="vd-content" @click="pageClick">
        <slot name="main-content">
          <router-view />
          <b-row class="justify-content-md-center mb-3 mt-5">
            <footer class="sticky-footer">
              <div class="mx-auto">
                <div class="copyright text-center text-dark">
                  <span>Copyright &copy; DRINKTEC 2021</span>
                </div>
              </div>
            </footer>
          </b-row>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderItems from '@/components//HeaderItems.vue'
import SidebarItems from '@/components//Sidebar.vue'

export default {
  name: 'Home',
  components:{
    HeaderItems,
    SidebarItems,
  },
  data(){
    return{
      sidebarHeaderHeight: '50px',
      pageBackground: 'white',
      headerBackground: 'white',
      sidebarBackground: 'white',
      sidebarIsVisible: true,
      isCollapse: false,
      brand: '',
      location: ''
    }
  },
  mounted(){
    this.$nextTick(() => {window.addEventListener('resize', this.onResize)});
    this.onResize();
  },
  beforeDestroy(){window.removeEventListener('resize', this.onResize)},
  watch:{
    '$route'(){this.pageClick()}
  },
  methods:{
    onResize(){
      if(window.innerWidth <= 1200){
        this.sidebarIsVisible = false;
        this.isCollapse = true;
      } else {
        this.sidebarIsVisible = true;
        this.isCollapse = false;
      }
    },
    openMenu(){this.sidebarIsVisible = true},
    closeSidebar(){this.sidebarIsVisible = false},
    pageClick(){if(this.isCollapse && this.sidebarIsVisible){this.closeSidebar()}}
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.title {
  margin-top: 15px;
}
.vd-content>.wrapper{
  min-height:90vh;
}
.vd-main {
  padding-left: 250px;
  transition: all 0.5s;
  -webkit-transition: all 0.25s;
}
.vd-content {
  padding: 6rem 1.5rem 0rem 1.5rem;
  background-color: var(--vd-page-background, white);
  position: absolute;
  min-height: 100%;
  width: -webkit-calc(100% - 250px);
  width: -moz-calc(100% - 250px);
  width: calc(100% - 250px);
}
@media screen and (max-width: 1200px) {
  .vd-main {
    padding-left: 0px;
  }
  .vd-content {
    width: 100%;
  }
}
</style>
