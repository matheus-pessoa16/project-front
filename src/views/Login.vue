<template>
  <v-sheet>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <v-sheet>
        <v-tabs
          v-model="tab"
          show-arrows
          background-color="primary"
          icons-and-text
          grow
        >
          <v-tabs-slider color="purple darken-4"></v-tabs-slider>
          <v-tab v-for="i in tabs" :key="i.name">
            <v-icon large>{{ i.icon }}</v-icon>
            <span class="caption py-1 white--text" color="primary">{{
              i.name
            }}</span>
          </v-tab>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="loginForm" v-model="valid">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="loginUser.login"
                        :rules="[rules.required]"
                        label="Login"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="loginUser.password"
                        :append-icon="show1 ? 'eye' : 'eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 6 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                      <v-btn
                        x-large
                        block
                        :disabled="!valid"
                        color="success"
                        @click="login()"
                      >
                        Login
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="registerForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="registrationUser.name"
                        :rules="[rules.required]"
                        label="Name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="registrationUser.cpf"
                        :rules="[rules.required]"
                        label="Document"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="registrationUser.birthday"
                        :rules="[rules.required]"
                        label="Birthday"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="registrationUser.email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="registrationUser.login"
                        :rules="[rules.required]"
                        label="Login"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="registrationUser.password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        block
                        v-model="verify"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, passwordMatch]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm Password"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                      <v-btn
                        x-large
                        block
                        :disabled="!valid"
                        color="success"
                        @click="signUp()"
                        >Register</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-sheet>
    </v-dialog>
  </v-sheet>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Login',
  computed: {
    passwordMatch() {
      return () =>
        this.registrationUser.password === this.verify || 'Password must match';
    },
  },
  data() {
    return {
      dialog: true,
      tab: 0,
      tabs: [
        { name: 'Login', icon: 'mdi-account' },
        { name: 'Register', icon: 'mdi-account-outline' },
      ],
      valid: true,

      registrationUser: {
        name: null,
        email: null,
        password: null,
        login: null,
        cpf: null,
        birthday: null,
      },

      verify: '',

      loginUser: {
        password: null,
        login: null,
      },

      loginEmailRules: [
        (v) => !!v || 'Required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      emailRules: [
        (v) => !!v || 'Required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],

      show1: false,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => (v && v.length >= 6) || 'Min 6 characters',
      },
    };
  },
  methods: {
    ...mapActions(['getTokenAndSetUser', 'createNewUser']),
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('/');
      return `${year}-${month}-${day.substring(0, 2)}`;
    },
    login() {
      if (this.$refs.loginForm.validate()) {
        this.getTokenAndSetUser(this.loginUser);
      }
    },
    signUp() {
      this.createNewUser(this.registrationUser);
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
