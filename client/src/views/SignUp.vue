<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-form 
          v-if="!loading"
          v-model="valid"
          @submit.prevent="signUp"
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
          <v-text-field
            v-model="user.confirmPassword"
            :rules="confirmPasswordRules"
            :counter="8"
            label="Confirmer votre mot de passe"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.displayName"
            :rules="notEmptyRules"
            label="Nom affiché de votre profil"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.imageUrl"
            :rules="notEmptyRules"
            label="Url de votre photo de profil"
            required
          ></v-text-field>
          <v-btn type="submit" :disabled="!valid">Enregistrez-vous</v-btn>
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
import { mapState } from 'vuex'

export default {
  name: 'signUp',
  data: vm => ({
    valid: false,
    user: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      imageUrl: ''
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
    ],
    confirmPasswordRules: [
      confirmPassword =>
        confirmPassword === vm.user.password ||
        'Les mots de passe entrés ne sont pas identiques',
      value =>
        value.length <= 10 ||
        'Le mot de passe doit contenir au moins 8 caratères'
    ]
  }),
  computed: {
    ...mapState('users', { loading: 'isCreatePending' })
  },
  methods: {
    signUp() {
      if (this.valid) {
        const { User } = this.$FeathersVuex
        const user = new User(this.user)
        user.save({}).then(user => {
          console.log(user)
          this.$router.push('/login')
        })
      }
    }
  }
}
</script>
