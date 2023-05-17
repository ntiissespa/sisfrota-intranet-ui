<template>
  <div class="col-12" v-if="objSelected != null">
    <p class="text-center">
      <span>
        <img src="../../../public/images/sespa/user.png" class="circle-image" />
      </span>

      <br />
      <strong v-if="objSelected">{{ objSelected.operator }}.</strong>
    </p>
  </div>
</template>

<script>
export default {
  props: ["objSelected"],
};
</script>

<style></style>
