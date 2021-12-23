<template>
   <div class="wrapper">
    <h1>Report</h1>
    <a>You can report any issues, questions or book a service driectly with us using the form below.</a>
    <b-form ref="form" @submit="onSubmit" @reset="onReset" class="mt-2">
      <b-form-group id="input-group-1" label="Email:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          name="FormEmail"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="catSelect" label="Category" label-for="catSelect">
        <b-form-select
          id="input-cat"
          v-model="form.cat"
          :options="catOpt"
          name="FormService"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="title" label="Title" label-for="input-title">
        <b-form-input
          id="input-title"
          v-model="form.title"
          name="FormTitle"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Messages:" >
        <b-form-textarea
          id="textarea"
          v-model="form.text"
          name="FormMessage"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary"><font-awesome-icon fixed-width icon="paper-plane"/> Send</b-button>
    </b-form>
   </div>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
  name: 'Report',
  data(){
    return {
      form: {
        email: '',
        cat: 1,
        title: '',
        text:''
      },
      catOpt: [{ text: 'Book a service', value: 1},
      { text: 'Pump issue', value: 2},
      { text: 'Pipe issue', value: 3},
      { text: 'Machine issue', value: 4},
      {text: 'Other', value: 5}]
    }
  },
  methods:{
    onSubmit(event){
      event.preventDefault()
      // alert(JSON.stringify(this.form))
      emailjs.sendForm('service_toowmls', 'template_44gio4s', this.$refs.form, 'user_l4UA7bpMt6xQRtBmtAFZv')
      .then((result) => {
        alert('SUCCESS!', result.text);
        this.onReset(event)
      }, (error) => {
        alert('FAILED...', error.text);
      });
    },
    onReset(event){
      event.preventDefault()
      this.form.email = ''
      this.form.cat = 1
      this.form.title = ''
      this.form.text = ''
    }
  }
}
</script>

<style scoped>

</style>