<template>
  <div class="wrapper">
    <b-alert :show="dismissCountDown" dismissible fade variant="success" @dismiss-count-down="countDownChanged">
      {{$t('report.sent')}}
    </b-alert>
    <h3>{{$t('report.title')}}</h3>
    <a class="text-dark">{{$t('report.msg')}}</a>
    <b-form ref="form" @submit="onSubmit" @reset="onReset" class="mt-2">
      <b-form-input id="input-brand" v-model="form.brand" name="FormCompany" hidden></b-form-input>
      <b-form-group id="input-group-1" :label="$t('report.email')" label-for="input-1" class="text-dark">
        <b-form-input id="input-email" v-model="form.email" type="email" name="FormEmail" required ></b-form-input>
      </b-form-group>
      <b-form-group id="catSelect" :label="$t('report.category')" label-for="catSelect" class="text-dark">
        <b-form-select id="input-cat" v-model="form.cat" :options="getCatOpt" name="FormService" required></b-form-select>
      </b-form-group>
      <b-form-group id="title" :label="$t('report.mail title')" label-for="input-title" class="text-dark">
        <b-form-input id="input-title" v-model="form.title" name="FormTitle" required></b-form-input>
      </b-form-group>
      <b-form-group :label="$t('report.message')" class="text-dark">
        <b-form-textarea id="textarea" v-model="form.text" name="FormMessage" rows="3" max-rows="6" required></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="outline-success"><font-awesome-icon fixed-width icon="paper-plane" v-if="iconShow"/> {{$t('report.'+btnText)}} <b-spinner small v-if="btnClicked['b']"></b-spinner></b-button>
    </b-form>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';
import { perf } from "../fire";
import store from '../store/store'
import { mapGetters } from 'vuex'
import Vue from 'vue';

export default {
  name: 'Report',
  data(){
    return {
      iconShow: true,
      btnText: 'send',
      btnClicked : [],
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      form: {
        email: '',
        cat: this.$i18n.t('report.book'),
        title: '',
        text:'',
        brand: store.getters.getLocation
      },
      catOpt: [{text: this.$i18n.t('report.book'), value: this.$i18n.t('report.book')},
      {text: this.$i18n.t('report.pump'), value: this.$i18n.t('report.pump')},
      {text: this.$i18n.t('report.pipe'), value: this.$i18n.t('report.pipe')},
      {text: this.$i18n.t('report.machine'), value: this.$i18n.t('report.machine')},
      {text: this.$i18n.t('report.other'), value: this.$i18n.t('report.other')}]
    }
  },
  computed:{
    ...mapGetters([
      'getLocation'
    ]),
    'getCatOpt': function() {
      this.selected();
      return [{text: this.$i18n.t('report.book'), value: this.$i18n.t('report.book')},
      {text: this.$i18n.t('report.pump'), value: this.$i18n.t('report.pump')},
      {text: this.$i18n.t('report.pipe'), value: this.$i18n.t('report.pipe')},
      {text: this.$i18n.t('report.machine'), value: this.$i18n.t('report.machine')},
      {text: this.$i18n.t('report.other'), value: this.$i18n.t('report.other')}]
    }
  },
  watch: {
    getLocation(val){
      this.form.brand = val;
    }
  },
  methods:{
    countDownChanged(dismissCountDown){this.dismissCountDown = dismissCountDown},
    showAlert(){this.dismissCountDown = this.dismissSecs},
    selected(){this.form.cat = this.$i18n.t('report.book')},
    onSubmit(event){
      event.preventDefault();
      const trace = perf.trace("sendEmail");
			trace.start();
      this.iconShow = false;
      this.btnText = '';
      Vue.set(this.btnClicked,'b',1);
      emailjs.sendForm('service_toowmls', 'template_44gio4s', this.$refs.form, 'user_l4UA7bpMt6xQRtBmtAFZv')
      .then((result) => {
        this.showAlert();
        this.onReset(event);
      },(error) => {
        alert('FAILED...', error.text);
      });
      trace.stop();
    },
    onReset(event){
      event.preventDefault();
      this.form.email = '';
      this.selected();
      this.form.title = '';
      this.form.text = '';
      this.iconShow = true;
      this.btnText = 'send';
      Vue.set(this.btnClicked,'b',0);
    }
  }
}
</script>

<style scoped>

</style>