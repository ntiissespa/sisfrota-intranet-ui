<template>
  <Fieldset legend="VEÍCULO" :toggleable="true">
    <div class="grid">
      <div class="col-12 md:col-6">
        <p><b>Marca: </b>{{ obj.vehicle.brand }}</p>
      </div>
      <div class="col-12 md:col-6">
        <p><b>Modelo: </b>{{ obj.vehicle.model }}</p>
      </div>
      <div class="col-12 md:col-6">
        <p><b>RENAVAM: </b>{{ obj.vehicle.renavam }}</p>
      </div>
      <div class="col-12 md:col-6">
        <p><b>Tipo de Combustível: </b>{{ convertFuel(obj.vehicle.fuel) }}</p>
      </div>
      <div class="col-12 md:col-6">
        <p><b>Placa: </b>{{ obj.vehicle.plate }}</p>
      </div>
      <div class="col-12 md:col-6">
        <p><b>Cor: </b>{{ obj.vehicle.color }}</p>
      </div>
    </div>
  </Fieldset>
</template>

<script>
import { convertFuel } from "../../../../models/enums/fuel_type";
export default {
  props: ["obj"],
  data() {
    return {
      convertFuel,
    };
  },
};
</script>

<style></style>
