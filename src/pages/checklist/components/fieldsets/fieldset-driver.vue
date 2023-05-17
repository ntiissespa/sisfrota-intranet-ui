<template>
  <Fieldset legend="MOTORISTA" :toggleable="true">
    <div class="grid">
      <div class="col-12 text-center">
        <img
          :src="obj.driver.url"
          class="circle-image shadow-4"
          style="width: 100px; height: 100px"
          v-if="obj.driver.url"
        />
        <img
          src="../../../../../public/images/sespa/user.png"
          class="circle-image"
          v-else
        />
      </div>
      <div class="col-12 md:col-4">
        <p><b>Motorista: </b>{{ obj.driver.name }}</p>
      </div>
      <div class="col-12 md:col-4">
        <p><b>Matricula: </b>{{ obj.driver.credential }}</p>
      </div>
      <div class="col-12 md:col-4">
        <p><b>CNH: </b>{{ obj.driver.cnh }}</p>
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
