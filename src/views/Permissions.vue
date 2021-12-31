<template>
   <div class="wrapper">
    <h3>Permissions</h3>
    <b-row class="text-dark">
      <b-col cols="4">
        <p>{{$t('permissions.account title')}}</p>
        <p>{{$t('permissions.account description1')}}</p>
        <p>{{$t('permissions.account description2')}}</p>
      </b-col>
      <b-col cols="8">
        <b-card class="text-center">
          <font-awesome-icon fixed-width icon="cog" class="float-right"/>
          <b-row>
            <b-col cols="6">
              <p class="text-bold">
                <svg width="18px" height="18px" viewBox="0 0 18 18" class="bi bi-person-badge-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h7A2.5 2.5 0 0 1 14 2.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2.5zM4.5 1A1.5 1.5 0 0 0 3 2.5v10.795a4.2 4.2 0 0 1 .776-.492C4.608 12.387 5.937 12 8 12s3.392.387 4.224.803a4.2 4.2 0 0 1 .776.492V2.5A1.5 1.5 0 0 0 11.5 1h-7z"/>
                  <path fill-rule="evenodd" d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/>
                </svg> {{$t('permissions.role')}}
              </p>
              <p>user_role</p>
            </b-col>
            <b-col cols="6">
              <p class="text-bold">
                <svg width="18px" height="18px" viewBox="0 0 18 18" class="bi bi-card-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                  <path fill-rule="evenodd" d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                </svg> {{$t('permissions.name')}}
              </p>
              <p>user_name</p>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      
      <b-col cols="4">
        <p>{{$t('permissions.staff title')}}</p>
        <p>{{$t('permissions.staff description1')}}</p>
      </b-col>
      <b-col cols="8">
        <b-card>
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.add-account variant="outline-success">
              <svg width="24px" height="24px" viewBox="0 0 18 18" class="bi bi-person-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
              </svg> {{$t('permissions.add staff title')}}
            </b-button>
          </b-card-header>
          <b-collapse id="add-account" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <!-- <b-form ref="form" @submit="onSubmit" @reset="onReset" class="mt-2">
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
              </b-form> -->
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card class="mt-3">
          table
        </b-card>
      </b-col>
    </b-row>
   </div>
</template>

<script>
export default {
  name: 'Permissions',
}
</script>