<template>
  <div class="wrapper">
    <b-container>
      <div class="mx-auto" style="width:300px;margin-top:50px">
        <img src="@/assets/pic/logow.webp" style="width:100%; height:100%">
      </div>
    </b-container>
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
        <b-col cols="12" md="4">
          <b-card class="o-hidden border-0 shadow-lg my-5">
            <b-card-text class="p-0">
              <div class="col-lg-11" style="margin: 30px auto;">
                <div class="text-center mb-4">
                  <h3 class="font-weight-bold" dlang="login-title">{{$t('login.title')}}</h3>
                  <p dlang="login-msg" class="text-dark">{{$t('login.msg')}}</p>
                  <hr>
                </div>
                <b-form @submit.prevent="onSubmit" v-if="show">
                  <b-form-group class="mt-4" id="input-group-1" label-for="input-1">
                    <b-form-input id="input-1" v-model="form.email" type="email" placeholder="Email" required></b-form-input>
                  </b-form-group>
                  <b-form-group class="mt-4" id="input-group-2" label-for="input-2">
                    <b-form-input id="input-2" v-model="form.password" type="password" :placeholder="$t('login.inputpassword')" required></b-form-input>
                  </b-form-group>
                  <b-button pill class="mt-4 w-100" type="submit" variant="primary">{{btn.text}}<b-spinner small v-if="btnClicked['b']"></b-spinner></b-button>
                  <p class="text-danger text-center pt-3">{{msg.err}}</p>
                </b-form>
              </div>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <div class="justify-content-md-center">
        <footer class="sticky-footer">
          <div class="mx-auto">
            <div class="copyright text-center text-light">
              <small>Copyright &copy; DRINKTEC 2022</small>
            </div>
          </div>
        </footer>
      </div>
    </b-container>
  </div>
</template>

<script>
  import {auth, signInWithEmailAndPassword, perf, trace} from '../fire';
  import Vue from 'vue';

  export default {
    name: 'Login',
    data(){
      return{
        form:{
          email:'',
          password:''
        },
        btn:{
          text:this.$i18n.t('login.login'),
        },
        msg:{
          err:''
        },
        btnClicked : [],
        show: true
      }
    },
    methods: {
      async onSubmit(event) {
        event.preventDefault();
        const t = trace(perf,"loginClicked");
        t.start();
        this.btn.text = '';
        this.msg.err = '';
        Vue.set(this.btnClicked,'b',1);
        signInWithEmailAndPassword(auth, this.form.email, this.form.password)
        .then(() => {
          this.btn.text = this.$i18n.t('login.login');
          Vue.set(this.btnClicked,'b',0);
          this.$router.replace({name: "Dashboard"});
        }).catch((error) => {
          this.msg.err = error.code.replace('auth/','').split('-').join(' ');
          this.btn.text = this.$i18n.t('login.login');
          Vue.set(this.btnClicked,'b',0);
        });
        t.stop();
      }
    }
  }
</script>
