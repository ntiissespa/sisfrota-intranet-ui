<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" src="../../../public/images/sespa/brasao.svg" />
      <span class="ml-4">SISFROTA</span>
    </router-link>
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <button class="p-link layout-topbar-button" @click="signOut">
          <i class="pi pi-sign-out"></i>
          <span>Sair</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import AuthService from "../../service/auth/auth_service";

export default {
  data() {
    return {
      authService: new AuthService(),
    };
  },
  created() {
    if (sessionStorage.getItem("token")) {
      this.$router.push("/");
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
    onTopbarMenuToggle(event) {
      this.$emit("topbar-menu-toggle", event);
    },
    topbarImage() {
      return this.$appState.darkTheme
        ? "images/logo-white.svg"
        : "images/logo-dark.svg";
    },
    signOut() {
      window.location.replace(this.$UrlIntranet);
    },
    toProfile() {
      this.$router.push("/profile");
    },
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    },
  },
};
</script>
