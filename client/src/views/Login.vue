<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-form 
          v-if="!loading"
          v-model="valid"
          @submit.prevent="login"
          @keydown.prevent.enter>
          <v-text-field
            v-model="user.email"
            :rules="emailRules"
            label="Adresse e-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="passwordRules"
            :counter="8"
            label="Mot de passe"
            type="password"
            required
          ></v-text-field>
          <v-btn type="submit" :disabled="!valid">Connexion</v-btn>
        </v-form>
        <div class="text-xs-center">
        <v-progress-circular
          v-if="loading"
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
        </div>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'login',
  data: vm => ({
    valid: false,
    user: {
      email: '',
      password: ''
    },
    notEmptyRules: [value => !!value || 'Ce champ est obligatoire'],
    emailRules: [
      value => !!value || 'Votre adresse e-mail est un champ obligatoire',
      value => /.+@.+/.test(value) || 'Votre adresse e-mail doit être correct'
    ],
    passwordRules: [
      value =>
        value.length <= 8 ||
        'Le mot de passe doit contenir au moins 8 caratères',
      value => !!value || 'Ce champ est obligatoire'
    ]
  }),
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' })
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    login() {
      if (this.valid) {
        this.authenticate({
          strategy: 'local',
          ...this.user
        })
          .then(() => {
            this.$router.push('/main')
          })
          .catch(e => {
            console.error('Authentication error', e)
          })
      }
    }
  }
}
</script>
