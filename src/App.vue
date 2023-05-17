<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
    </div>

    <Toast />
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view />
      </div>
      <AppFooter />
    </div>

    <AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" />
    <transition name="layout-mask">
      <div
        class="layout-mask p-component-overlay"
        v-if="mobileMenuActive"
      ></div>
    </transition>
  </div>
</template>

<script>
//COMPONENTS
import AppTopBar from "./components/menu/AppTopbar.vue";
import AppMenu from "./components/menu/AppMenu.vue";
import AppConfig from "./components/menu/AppConfig.vue";
import AppFooter from "./components/menu/AppFooter.vue";
import AuthService from "./service/auth/auth_service";

export default {
  emits: ["change-theme"],
  data() {
    return {
      user: null,
      layoutMode: "static",
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      authService: new AuthService(),
      menu: [
        {
          label: "Principal",
          items: [
            {
              label: "Home",
              icon: "pi pi-fw pi-home",
              to: "/",
            },
          ],
        },
        {
          label: "Veículos",
          items: [
            {
              label: "Gerenciamento de Veículos",
              icon: "pi pi-fw pi-check-circle",
              to: "/veiculos",
              visible: () =>
                this.findPermission("ROLE_SISFROTA_LISTAR_VEICULO"),
            },
          ],
        },
        {
          label: "Administração de Funcionários",
          items: [
            {
              label: "Gerenciamento de Motoristas",
              icon: "pi pi-fw pi-user",
              to: "/motoristas",
              visible: () =>
                this.findPermission("ROLE_SISFROTA_LISTAR_MOTORISTA"),
            },
          ],
        },
        {
          label: "Administração do Sistema",
          items: [
            {
              label: "Gerenciamento de Documentos",
              icon: "pi pi-fw pi-file",
              to: "/documentos",
              visible: () =>
                this.findPermission("ROLE_SISFROTA_LISTAR_DOCUMENTO"),
            },
            {
              label: "Gerenciamento de Acessórios",
              icon: "pi pi-fw pi-cog",
              to: "/acessorios",
              visible: () =>
                this.findPermission("ROLE_SISFROTA_LISTAR_ACESSORIO"),
            },
            {
              label: "Gerenciamento de Avarias",
              icon: "pi pi-fw pi-ban",
              to: "/avarias",
              visible: () =>
                this.findPermission("ROLE_SISFROTA_LISTAR_AVARIAS"),
            },
            {
              label: "Gerenciamento de Pneu",
              icon: "pi pi-fw pi-table",
              to: "/pneus",
              visible: () => this.findPermission("ROLE_SISFROTA_LISTAR_PNEU"),
            },
          ],
        },
      ],
    };
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
      this.$Token
        .checkToken()
        .then(() => {})
        .catch((error) => {
          if (this.$router.path !== "/") {
            this.$toast.add({
              severity: "warn",
              summary: "Atenção.",
              detail: error,
              life: 6000,
            });
            this.$router.push("/");
          }
        });
    },
  },
  mounted() {
    if (!this.checkGroupPermission("ADMINISTRADOR_SISFROTA")) {
      this.$router.push("/acesso-negado");
    }
  },
  created() {
    if (sessionStorage.getItem("token")) {
      this.$store.dispatch("setUserLogged");
      this.user = this.$store.getters.getUserLogged;
    } else {
      this.$toast.add({
        severity: "warn",
        summary: "Atenção!",
        detail: "Usuário desconectado! Você precisa fazer login novamente",
        life: 6000,
      });
      window.location.replace(this.$UrlIntranet);
    }
  },
  methods: {
    checkGroupPermission(p) {
      if (this.user.services) {
        let isPermited = this.user.services.filter(
          (a) => a.groupPermission == p
        );
        return isPermited.length > 0;
      } else {
        return false;
      }
    },
    findPermission(p) {
      if (this.user.authorities) {
        let isPermited = this.user.authorities.filter((a) => a == p);
        return isPermited.length > 0;
      } else {
        return false;
      }
    },
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
      this.menuClick = false;
    },
    onMenuToggle() {
      this.menuClick = true;
      if (this.isDesktop()) {
        if (this.layoutMode === "overlay") {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }

          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === "static") {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }

      event.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode;
    },
    addClass(element, className) {
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    },
    removeClass(element, className) {
      if (element.classList) element.classList.remove(className);
      else
        element.className = element.className.replace(
          new RegExp(
            "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
            "gi"
          ),
          " "
        );
    },
    isDesktop() {
      return window.innerWidth >= 992;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === "static") return !this.staticMenuInactive;
        else if (this.layoutMode === "overlay") return this.overlayMenuActive;
      }

      return true;
    },
  },
  computed: {
    containerClass() {
      return [
        "layout-wrapper",
        {
          "layout-overlay": this.layoutMode === "overlay",
          "layout-static": this.layoutMode === "static",
          "layout-static-sidebar-inactive":
            this.staticMenuInactive && this.layoutMode === "static",
          "layout-overlay-sidebar-active":
            this.overlayMenuActive && this.layoutMode === "overlay",
          "layout-mobile-sidebar-active": this.mobileMenuActive,
          "p-input-filled": this.$primevue.config.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.config.ripple === false,
        },
      ];
    },
    logo() {
      return this.$appState.darkTheme
        ? "images/logo-white.svg"
        : "images/logo.svg";
    },
  },
  beforeUpdate() {
    if (this.mobileMenuActive)
      this.addClass(document.body, "body-overflow-hidden");
    else this.removeClass(document.body, "body-overflow-hidden");
  },
  components: {
    AppTopBar: AppTopBar,
    AppMenu: AppMenu,
    AppConfig: AppConfig,
    AppFooter: AppFooter,
  },
};
</script>

<style lang="scss">
@import "./App.scss";
</style>
