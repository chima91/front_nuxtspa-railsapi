<template>
  <user-form-card>
    <template #user-form-card-content>
      <v-form ref="form" v-model="isValid" @submit.prevent="login">
        <user-form-email :email.sync="params.auth.email" />
        <user-form-password :password.sync="params.auth.password" />
        <v-card-actions>
          <nuxt-link to="#" class="body-2 text-decoration-none"
            >パスワードを忘れましたか？</nuxt-link
          >
        </v-card-actions>
        <v-card-text class="px-0">
          <v-btn
            type="submit"
            :loading="loading"
            :disabled="!isValid || loading"
            block
            class="white--text"
            color="appblue"
          >
            ログイン
          </v-btn>
        </v-card-text>
      </v-form>
    </template>
  </user-form-card>
</template>

<script>
export default {
  layout: "before-login",
  data({ $store }) {
    return {
      isValid: false,
      loading: false,
      params: { auth: { email: "", password: "" } },
      redirectPath: $store.state.loggedIn.rememberPath,
      loggedInHomePath: $store.state.loggedIn.homePath
    }
  },
  methods: {
    async login() {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/auth_token', this.params)
          .then(response => this.authSuccessful(response))
          .catch(error => this.authFailure(error))
      }
      this.loading = false
    },
    authSuccessful (response) {
      this.$auth.login(response)
      this.$router.push(this.redirectPath)
      // 記憶したルートを初期値に戻す
      this.$store.dispatch('getRememberPath', this.loggedInHomePath)
    },
    authFailure ({ response }) {
      if (response && response.status === 404) {
        const msg = "ユーザーが見つかりません...😂"
        return this.$store.dispatch('getToast', { msg })
      }
      return this.$my.apiErrorHandler(response)
    }
  }
}
</script>
