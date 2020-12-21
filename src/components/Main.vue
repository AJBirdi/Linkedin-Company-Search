<template>
  <v-container>
    <v-btn v-on:click="authenticateLinkedin">
      Log in to linkedin
    </v-btn>
    <v-btn v-on:click="acquireAccessToken">
      Acquire access token
    </v-btn>
  </v-container>
</template>

<script>
import axios from 'axios'

  export default {
    name: 'Main',

    data: () => ({
      currentUrl: new URL(document.location),
      authToken: "",
      accessToken: "",
    }),

    watch: {
      // Unfortunately, this API is deprecated and the new version is restricted so this call will always fail
      // 
      // By watching the access token, we can automatically call the LinkedIn API whenever the acces token
      //  value is set
      accessToken: function() {
        axios.get('https://api.linkedin.com/v1/company-search', {
          params: {
            'oauth2_access_token': this.accessToken
          }
        })
        // Log the response to the console saying that the we succesfully accessed the LinkedIn Company API
        .then(response => {
          console.log('Successfully accessed company search API')
          console.log(response)
        })
        // Log the response to the console saying that we did not succesfully access the LinkedIn Company API
        .catch(error => {
          console.log('Failed to access company search API')
          console.log(error)
        })
      }
    },

    mounted() {
      // Whenever the page is mounted, try and grab the value of the 'code' parameter, which is the access token
      //  that the LinkedIn API should return
      var params = this.currentUrl.searchParams
      console.log(params.get('code'))

      // When the page is first loaded, there is no code, so if the page loads with a code (which happens after a successful
      //  authentication redirects us back to the homepage) then set our authToken to the code we received
      if(params.get('code')) {
        this.authToken = params.get('code')
      }
    },

    methods: {
      // Load the page to ask the user to give access to our LinkedIn app 
      authenticateLinkedin: function() {
        window.location.href = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=778vjvybstajwn&redirect_uri=http://localhost:8080/&scope=r_liteprofile"
      },

      // Send a POST request to my AWS API Gateway which triggers a Lambda that will convert our authentication token 
      //  into an access token 
      acquireAccessToken: function() {
        axios.post('https://6zto52ofh7.execute-api.us-east-1.amazonaws.com/Prod', {
          authToken: this.authToken
        })
        .then(response => {
          console.log('Successfully acquired access token.')
          
          this.accessToken = response.data.access_token
          this.successfulAccessToken = true
        })
        .catch(error => {
          console.log('Failed to acquire access token.')
          console.log(error)
        })
      }
    }
  }
</script>
