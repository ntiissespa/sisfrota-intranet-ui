<template>
  <Toast />
  <Panel header="HOME">
    <h1>SISFROTA</h1>
  </Panel>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  created() {},
  computed: {
    personId: {
      get() {
        return this.$store.state.userLogged.personId;
      },
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
