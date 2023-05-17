<template>
  <Fieldset legend="AVARIAS" :toggleable="true">
    <div class="grid">
      <div
        class="col-12 md:col-6"
        v-for="breakdown in obj.breakdowns"
        :key="breakdown.id"
      >
        <p><b>Avaria: </b>{{ breakdown.description }}</p>
      </div>
    </div>
  </Fieldset>
</template>

<script>
export default {
  props: ["obj"],
};
</script>

<style></style>
