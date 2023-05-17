<template>
  <Fieldset legend="DOCUMENTOS" :toggleable="true">
    <div class="grid">
      <div
        class="col-12 md:col-6"
        v-for="document in obj.documents"
        :key="document.id"
      >
        <p><b>Documento: </b>{{ document.description }}</p>
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
