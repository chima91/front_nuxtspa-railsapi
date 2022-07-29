<template>
  <user-form-card>
    <template #user-form-card-content>
      <v-form v-model="isValid">
        <user-form-name :name.sync="params.user.name" />
        <user-form-email :name.sync="params.user.email" />
        <user-form-password :name.sync="params.user.password" />
        <v-btn :disabled="!isValid" block class="white--text" color="appblue">
          登録
        </v-btn>
      </v-form>
      {{ params }}
    </template>
  </user-form-card>
</template>

<script>
export default {
  layout: "before-login",
  data() {
    return {
      isValid: false,
      params: { user: { name: '', email: '', password: '' } }
    }
  },
}
</script>
