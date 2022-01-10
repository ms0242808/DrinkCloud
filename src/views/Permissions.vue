<template>
  <div class="wrapper">
    <b-row class="text-dark">
      <b-col cols="12" lg="4">
        <h5 class="text-bold">{{$t('permissions.account title')}}</h5>
        <p>{{$t('permissions.account description1')}}</p>
        <p>{{$t('permissions.account description2')}}</p>
      </b-col>
      <b-col cols="12" lg="8" class="mb-2">
        <b-card class="text-center">
          <b-button class="float-right" size="sm" variant="transparent" @click="eidtProfile()"><font-awesome-icon fixed-width icon="cog" v-show="profile"/><font-awesome-icon fixed-width icon="times" v-show="!profile"/></b-button>
          <b-row v-show="profile">
            <b-col cols="12" lg="6">
              <p class="text-bold"><font-awesome-icon fixed-width icon="id-badge"/> {{$t('permissions.role')}}</p>
              <p>{{$t('permissions.'+role)}}</p>
            </b-col>
            <b-col cols="12" lg="6">
              <p class="text-bold"><font-awesome-icon fixed-width icon="user"/> {{$t('permissions.name')}}</p>
              <p>{{user}}</p>
            </b-col>
          </b-row>
          <div v-show="!profile">
            <b-row class="my-1">
              <b-col sm="3">
                <label for="nameInp">{{$t('permissions.name')}}:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input v-model="editP.name" id="nameInp"></b-form-input>
              </b-col>
              <b-col sm="3" class="mt-3">
                <label for="newPass">{{$t('permissions.oldPass')}}:</label>
              </b-col>
              <b-col sm="9" class="mt-3">
                <b-form-input v-model="editP.oldPass" id="newPass" type="password"></b-form-input>
              </b-col>
              <b-col sm="3" class="mt-3">
                <label for="oldPass">{{$t('permissions.newPass')}}:</label>
              </b-col>
              <b-col sm="9" class="mt-3 mb-3">
                <b-form-input v-model="editP.newPass" id="oldPass" type="password"></b-form-input>
              </b-col>
              <b-col cols="12">
                <b-button class="float-right" size="sm" variant="outline-success" @click="updateUser()">Update</b-button>  
              </b-col>
            </b-row>
          </div>
        </b-card>
      </b-col>
      
      <b-col cols="12" lg="4" class="mt-3">
        <h5 class="text-bold">{{$t('permissions.staff title')}}</h5>
        <p>{{$t('permissions.staff description1')}}</p>
        <ul>
          <li>{{$t('permissions.staff description2')}}</li>
          <li class="mt-2">{{$t('permissions.staff description3')}}</li>
        </ul>
      </b-col>
      <b-col cols="12" lg="8">
        <b-card>
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.add-account size="sm" variant="transparent">
              <font-awesome-icon fixed-width icon="user-plus"/>
               {{$t('permissions.add staff title')}}
            </b-button>
          </b-card-header>
          <b-collapse id="add-account" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <!-- <b-form ref="form" @reset="onReset" class="mt-2"> -->
              <!-- <div class="mt-2"> -->
                <b-row class="mt-2">
                  <b-col cols="12" lg="6">
                    <b-form-group id="cname" :label="$t('permissions.name')" label-for="cname" class="text-dark text-bold">
                      <b-form-input id="cnameInp" v-model="createU.name" type="text" required></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" lg="6">
                    <b-form-group id="cemail" :label="$t('permissions.inputemail')" label-for="cemail" class="text-dark text-bold">
                      <b-form-input id="cemailInp" v-model="createU.email" type="email" required></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" lg="6">
                    <b-form-group id="crole" :label="$t('permissions.role')" label-for="crole" class="text-dark text-bold">
                      <b-form-select id="croleInp" v-model="createU.role" :options="roleOpt" required></b-form-select>
                    </b-form-group> 
                  </b-col>
                  <b-col cols="12" lg="6">
                    <b-form-group id="clocation" :label="$t('permissions.locations')" label-for="clocation" class="text-dark text-bold">
                      <b-form-checkbox-group id="clocationInp" v-model="createU.locations" :options="locationList" required></b-form-checkbox-group>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" lg="6">
                    <b-form-group id="cpass1" :label="$t('permissions.inputpassword')" label-for="cpass1" class="text-dark text-bold">
                      <b-form-input id="cpassInp1" v-model="createU.pass1" type="password" required></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" lg="6">
                    <b-form-group id="cpass2" :label="$t('permissions.inputpassword2')" label-for="cpass2" class="text-dark text-bold">
                      <b-form-input id="cpassInp2" v-model="createU.pass2" type="password" required></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12">
                    <b-button size="sm" variant="outline-success" class="float-right" @click.prevent="createNewUser()">{{$t('permissions.'+btnText)}} <b-spinner small v-if="btnClicked['b']"></b-spinner></b-button>
                    <b-button size="sm" variant="outline-dark" class="float-right mr-2" @click="onReset" v-b-toggle.add-account>{{$t('permissions.cancel')}}</b-button>
                  </b-col>
                </b-row>
              <!-- </div> -->
            </b-card-body>
            <hr>
          </b-collapse>
          <div class="mt-3">
            <b-form-group :label="$t('permissions.search')" label-for="searchInp" label-cols-sm="3" label-align-sm="right" label-size="sm" class="mb-2 w-50 float-right">
              <b-input-group size="sm">
                <b-form-input id="searchInp" v-model="filter" type="search"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-table striped hover responsive :items="staff" :fields="fields" :filter="filter">
              <template #cell(Role)="data">
                {{$t('permissions.'+data.item.Role)}}
              </template>
              <template #cell(Locations)="data">
                {{data.item.Locations.toString()}}
              </template>
              <template #cell(Action)="data">
                <b-button-group size="sm">
                  <b-button variant="outline-info" v-b-modal="'edit'+data.item.id"><font-awesome-icon fixed-width icon="edit"/></b-button>
                  <b-button variant="outline-danger" v-b-modal="'del'+data.item.id"><font-awesome-icon fixed-width icon="trash-alt"/></b-button>
                </b-button-group>
                <b-modal :ref="'edit'+data.item.id" :id="'edit'+data.item.id" centered :title="$t('permissions.update title')" @hide="hideModal('edit'+data.item.id)">
                  <div>
                    <b-form-group id="ename" :label="$t('permissions.name')" label-for="ename" class="text-dark text-bold">
                      <!-- <b-form-input id="enameInp" v-model="data.item.Name" type="text" required></b-form-input> -->
                      <label>{{data.item.Name}}</label>
                    </b-form-group>
                    <b-form-group id="erole" :label="$t('permissions.role')" label-for="erole" class="text-dark text-bold">
                      <b-form-select id="eroleInp" v-model="data.item.Role" :options="roleOpt" required></b-form-select>
                    </b-form-group> 
                    <b-form-group id="elocation" :label="$t('permissions.locations')" label-for="elocation" class="text-dark text-bold" required>
                      <b-form-checkbox-group id="elocationInp" v-model="data.item.Locations" :options="locationList" ></b-form-checkbox-group>
                    </b-form-group>
                  </div>
                  <template #modal-footer>
                    <div class="w-100">
                      <b-button size="sm" variant="outline-success" class="ml-1 float-right text-14" @click="updateStaff(data.item.id)">{{$t('permissions.update')}}</b-button>
                      <b-button size="sm" variant="outline-dark" class="ml-1 float-right text-14" @click="hideModal('edit'+data.item.id)">{{$t('permissions.cancel')}}</b-button>
                    </div>
                  </template>
                </b-modal>
                <b-modal :ref="'del'+data.item.id" :id="'del'+data.item.id" centered :title="$t('permissions.delete title')" @hide="hideModal('del'+data.item.id)">
                  <div>
                    <a class="text-dark">{{$t('permissions.delete msg')}} {{data.item.Name}}</a>
                  </div>
                  <template #modal-footer>
                    <div class="w-100">
                      <b-button size="sm" variant="outline-danger" class="ml-1 float-right text-14" @click="delStaff(data.item.id)">{{$t('permissions.delete')}}</b-button>
                      <b-button size="sm" variant="outline-dark" class="ml-1 float-right text-14" @click="hideModal('del'+data.item.id)">{{$t('permissions.cancel')}}</b-button>
                    </div>
                  </template>
                </b-modal>
              </template>
            </b-table>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { functions, httpsCallable, db, auth} from "../fire";
import firebase from 'firebase/compat/app'
import store from '../store/store'
import { mapGetters } from 'vuex'
import Vue from 'vue';

export default {
  name: 'Permissions',
  data(){
    return{
      brandL: store.getters.getLocation,
      user: store.getters.getUsername,
      role: store.getters.getRole,
      locationList: store.getters.getLocationList,
      profile: true,
      editP:{
        name: store.getters.getUsername,
        pass1: '',
        pass2: ''
      },
      btnText: 'add account',
      btnClicked : [],
      createU:{
        name: '',
        role: '',
        email: '',
        pass1: '',
        pass2: '',
        locations: [],
      },
      staff:[],
      filter: null
    }
  },
  computed:{
    ...mapGetters([
      'getLocation',
      'getUerLocation',
      'getRole',
      'getLocationList'
    ]),
    'roleOpt':function(){
      this.selected();
      return [
        {text:this.$i18n.t('permissions.Admin'),value:'Admin'},
        {text:this.$i18n.t('permissions.Staff'),value:'Staff'}
      ]
    },
    'fields':function(){
      return [
        {"key":"Name",label:this.$i18n.t('permissions.name')},
        {"key":"Role",label:this.$i18n.t('permissions.role')},
        {"key":"Locations",label:this.$i18n.t('permissions.locations')},
        {"key":"Action",label:this.$i18n.t('permissions.action')},
      ]
    }
  },
  methods:{
    hideModal(id){
      this.$refs[id].hide();
    },
    eidtProfile(){
      this.profile = !this.profile;
      this.editP={
        name: store.getters.getUsername,
        oldPass: '',
        newPass: ''
      }
    },
    onReset(event){
      event.preventDefault();
      this.createU={
        name: '',
        role: '',
        email: '',
        pass1: '',
        pass2: '',
        locations: [],
      }
      this.btnText= 'add account';
      Vue.set(this.btnClicked,'b',0);
    },
    selected(){this.createU.role = 'Admin'},
    async createNewUser(){
      // event.preventDefault();
      var email = this.createU.email,
      pass = this.createU.pass1;
      console.log('new',email,pass);
      
      // await auth.createUserWithEmailAndPassword(email,pass).then(async function(credential) {
      //   console.log("Created new user:", credential.user.uid);
      //   await db.collection('users').doc(credential.user.uid).set({
      //     email: email,
      //     brand: this.brandL.split('-')[0],
      //     role: this.createU.role,
      //     location: this.createU.locations,
      //     name: this.createU.name
      //   }).then(() => {
      //     console.log('created');
      //   });
      // }).catch(function(error) {
      //   console.log("Error creating new user:", error);
      // });
      
      var createuser = httpsCallable(functions,'createuser');
      await createuser({email,pass}).then(({data:user}) => {
        console.log('newUser',email,pass,user);
        db.collection('users').doc(user.uid).set({
          email: this.createU.email,
          brand: this.brandL.split('-')[0],
          role: this.createU.role,
          location: this.createU.locations,
          name: this.createU.name
        });
      }).catch((error) => {
        console.log(error);
      });
    },
    async updateUser(){
      const user = auth.currentUser;
      if(this.user !== this.editP.name){
        await db.collection('users').doc(user.uid).update({name: this.editP.name}).then(()=>{store.commit('userNameChanged',this.editP.name)});
      }
      if(this.editP.oldPass.length > 5 && this.editP.oldPass !== this.editP.newPass){
        var credential = firebase.auth.EmailAuthProvider.credential(user.email,this.editP.oldPass);
        user.reauthenticateWithCredential(credential).then(async() => {
          user.updatePassword(this.editP.newPass).then(async () => {
          }).catch((error) => {console.log(error)});
        }).catch((error) => {console.log(error);});
      }
      this.profile = !this.profile;
    },
    async getStaff(){
      let requests =  [];
      // console.log(this.brandL);
      db.collection('users').where('brand','==',this.brandL.split('-')[0]).onSnapshot(function(snapshot){
        let changes = snapshot.docChanges();
        // console.log(changes);
        var roleValue = ['Admin','Manager','Staff'];
        var selected = [];
        var locationList = store.getters.getLocationList;
        changes.forEach(change => {
          if(change.type === 'added' || change.type === 'modified'){
            var list = change.doc.data().location,
            [name,role,location] = [change.doc.data().name,change.doc.data().role,[]],
            x = false,
            c = 0;
            for(c in list){
              if(locationList.includes(list[c])){
                x = true;
                location.push(list[c]);
              }
            }
            if(x){
              requests.push({Name:name,Role:role,Locations:location,id:change.doc.id});
            }
          }else if(change.type === 'removed'){
            console.log("remove");
          }
        });
      });
      this.staff = requests;
    },
    async updateStaff(id){
      var x = 0,
      role = '',
      locations  = [];
      for(x in this.staff){
        if(this.staff[x].id == id){
          role = this.staff[x].Role;
          locations = this.staff[x].Locations;
        }
      }
      var userUpdate = httpsCallable(functions,'userUpdate');
      await userUpdate({name:'a'+id, role:role, location:locations}).then(result =>{
        this.hideModal('edit'+id);
      });
    },
    async delStaff(id){
      var adminDelete = httpsCallable(functions,'adminDelete');
      await adminDelete({name:'a'+id}).then(result => {
        this.hideModal('del'+id);
      });
    }
  },
  watch: {
    getLocation(val){
      this.brandL = val;
      // this.loadTable();
    }
  },
  mounted(){
    // console.log(this.getLocation);
    this.getStaff();
    if(this.brandL == '-'){
      // console.log(2,this.brandL);
      this.brandL = this.getLocation;
      // console.log(2,this.brandL);
      this.getStaff();
    }
    
  }
}
</script>