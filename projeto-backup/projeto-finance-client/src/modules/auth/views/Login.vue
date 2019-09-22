<template>
  <v-container fill-height>
    <v-layout
      justify-center
      align-center
    >

      <v-flex
        xs12
        sm8
        md5
        lg5
        xl5
      >
        <v-card class="elevation-12">

          <v-toolbar
            color="primary"
            dark
          >
            <v-toolbar-title>{{ texts.toolbar }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-progress-circular
              width="2"
              color="white"
              v-show="isLoading"
              indeterminate
            ></v-progress-circular>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                v-if="!isLogin"
                prepend-icon="person"
                label="Name"
                type="text"
                :error-messages="nameErrors"
                :success="!$v.user.name.$invalid"
                v-model.trim="$v.user.name.$model"
              ></v-text-field>
              <v-text-field
                prepend-icon="email"
                label="Email"
                type="email"
                :error-messages="emailErrors"
                :success="!$v.user.email.$invalid"
                v-model.trim="$v.user.email.$model"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                label="Senha"
                type="password"
                :error-messages="passwordErrors"
                :success="!$v.user.password.$invalid"
                v-model.trim="$v.user.password.$model"
              ></v-text-field>
              <v-btn
                block
                depressed
                color="secondary"
                @click="isLogin = !isLogin"
              >{{ texts.button }}</v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="$v.$invalid"
              large
              color="primary"
              @click="submit"
            >{{ texts.toolbar }}</v-btn>
          </v-card-actions>

          <v-snackbar
            v-model="showSnackbar"
            top
          >{{ error }}
            <v-btn
              color="pink"
              flat
              icon
              @click="showSnackbar = false"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-snackbar>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { formatError } from '@/utils'
import AuthService from './../services/auth-services'

export default {
  name: 'Login',
  data: () => ({
    error: undefined,
    isLogin: true,
    isLoading: false,
    showSnackbar: false,
    user: {
      name: '',
      email: '',
      password: ''
    }
  }),
  validations () {
    const validations = {
      user: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
    }
    if (this.isLogin) { return validations }

    return {
      user: {
        ...validations.user,
        name: {
          required,
          minLength: minLength(3)
        }
      }
    }
  },
  computed: {
    texts () {
      return this.isLogin
        ? { toolbar: 'Entrar', button: 'Criar conta' }
        : { toolbar: 'Criar conta', button: 'Já tenho conta' }
    },
    nameErrors () {
      const errors = []
      const name = this.$v.user.name
      if (!name.$dirty) { return errors }
      !name.required && errors.push('Nome é obrigatório')
      !name.minLength && errors.push(`Nome deve conter acima de ${name.$params.minLength.min} caracteres`)
      return errors
    },
    emailErrors () {
      const errors = []
      const email = this.$v.user.email
      if (!email.$dirty) { return errors }
      !email.required && errors.push('O campo email é obrigatório')
      !email.email && errors.push('Insira um email válido')
      return errors
    },
    passwordErrors () {
      const errors = []
      const password = this.$v.user.password
      if (!password.$dirty) { return errors }
      !password.required && errors.push('Senha é obrigatório')
      !password.minLength && errors.push(`Senha deve conter acima de ${password.$params.minLength.min} caracteres`)
      return errors
    }
  },
  methods: {
    async submit () {
      this.isLoading = true
      try {
        this.isLogin ? await AuthService.signin(this.user) : await AuthService.signup(this.user)
        this.$router.push(this.$route.query.redirect || '/dashboard')
      } catch (err) {
        console.log(err)
        this.error = formatError(err.message)
        this.showSnackbar = true
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
