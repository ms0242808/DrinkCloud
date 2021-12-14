<template>
  <b-modal ref="setModal" :id="id" centered title="Drink settings"> 
    <div v-for="(item,index) in settingList" :key="index">
      <p class="mt-1" >{{item.id}}</p>
    </div>
    <template #modal-footer>
      <div class="w-100">
        <b-button variant="primary" class="float-right">Save</b-button>
        <b-button class="float-right" @click="hideModal">cancel</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>

export default {
  name:'modal',

}
</script>

<style scoped>

</style>