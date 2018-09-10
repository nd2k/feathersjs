<template>
  <v-app>
    <v-toolbar
      app
    >
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>FEATHERS | DEMO</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="!user">
      <v-btn flat :to="{ name: 'login'}">Connection</v-btn>
      <v-btn flat :to="{ name: 'signup'}">Enregistrez-vous</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="user">
      <v-btn flat @click="logout">Déconnection</v-btn>
      <v-avatar>
        <img
          :src="user.imageUrl"
          :alt="user.displayName"
        >
      </v-avatar>
    </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; Made by nd2k | 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      fixed: false
    }
  },
  computed: {
    ...mapState('auth', { user: 'payload' })
  },
  methods: {
    ...mapActions('auth', { authLogout: 'logout' }),
    logout() {
      this.authLogout().then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
