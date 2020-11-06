<template>
  <v-container>
    <v-btn v-on:click="authenticate_linkedin">
      Log in to linkedin
    </v-btn>
  </v-container>
</template>

<script>
// import axios from 'axios'

  export default {
    name: 'HelloWorld',

    data: () => ({
      
    }),
    methods: {
      authenticate_linkedin: function() {
        console.log('Im gonna log in bitch!!')

        window.location.href = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=7772llrwy7zuxm&redirect_uri=http://linkedin-company-search.s3-website-us-east-1.amazonaws.com/&scope=r_liteprofile"
      }
    }
  }
</script>
